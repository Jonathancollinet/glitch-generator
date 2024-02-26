import { z } from 'zod';
import type {
    GlitchError,
    GlitchConfig,
    GlitchShadowField,
    GlitchErrors
} from './types';
import {
    glitchBaseConfigSchemas,
    glitchTextSchemas,
    glitchAnimationSchemas,
    glitchColorSchemas,
    glitchTextShadowFieldSchemas
} from './schemas';

export default class GlitchValidator {
    private errors: GlitchErrors;

    constructor() {
        this.errors = {};
    }

    /*
    * This method is used to validate the Glitch configuration.
    * We need the old configuration to compare the new one to avoid unnecessary validation.
    * If the old configuration is not defined, we will perform the validation on the entire configuration.
    * @param newConfig The new Glitch configuration.
    * @param oldConfig The old Glitch configuration.
    * @returns True if the configuration is valid.
    */
    validateConfig(newConfig: GlitchConfig, oldConfig: GlitchConfig | undefined) {
        if (this.hasErrorOrRemoveExisting(!newConfig, {
            path: 'Glitch',
            code: 'invalid_object',
            message: `The Glitch configuration is not defined.`
        })) {
            return false;
        }

        const success = this.validateConfigLeafs(newConfig, oldConfig);

        // We call the onValidated method to notify the user about the validation result.
        this.onValidated(newConfig);

        if (!success) {
            return false;
        }

        return true;
    }

    /*
    * Called by the Glitch class to validate a batch of fields, from any range.
    * @param config The Glitch configuration.
    * @param fields The fields to validate.
    * @returns True if the fields are valid.
    */
    computeFields(config: GlitchConfig, fields: GlitchShadowField[]) {
        const results: boolean[] = [];
        const configRanges = config.ranges;
        const pathRanges = 'ranges';

        if (this.hasErrorOrRemoveExisting(!configRanges, {
            path: pathRanges,
            code: 'invalid_object',
            message: `The ranges are not defined.`
        })) {
            return false;
        }

        for (let fieldIndex = 0, len = fields.length; fieldIndex < len; fieldIndex++) {
            const field = fields[fieldIndex];
            const configRange = configRanges[field.range];
            const rangePath = `${pathRanges}[${field.range}]`;

            if (this.hasErrorOrRemoveExisting(!configRange, {
                path: rangePath,
                code: 'invalid_object',
                message: `Impossible to perform a field change where the ${field.range} is not an existing index in ranges.`
            })) {
                return false;
            }

            const configRangeField = configRange[field.index];
            const configRangeFieldPath = `${rangePath}[${field.index}]`;

            if (this.hasErrorOrRemoveExisting(!configRangeField, {
                path: configRangeFieldPath,
                code: 'invalid_object',
                message: `Impossible to perform a field change where the ${field.index} is not an existing index in ${rangePath}.`
            })) {
                return false;
            }

            results.push(this.validateRangeField(field, undefined, `ranges[${field.range}]`));
        }

        return results.every(result => result);
    }

    /*
    * This method is used to validate every leafs of the Glitch configuration.
    * @param newConfig The new Glitch configuration.
    * @param oldConfig The old Glitch configuration.
    * @returns True if the configuration is valid.
    */
    private validateConfigLeafs(newConfig: GlitchConfig, oldConfig: GlitchConfig | undefined) {
        const newTextLeaf = newConfig.text;
        const newTextColorLeaf = newTextLeaf?.color;
        const newAnimationLeaf = newConfig.animation;
        const oldTextLeaf = oldConfig?.text;
        const oldTextColorLeaf = oldTextLeaf?.color;
        const oldAnimationLeaf = oldConfig?.animation;

        const results = [
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'onValidated'),
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'preventRangesCompute'),
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'controls'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'message', 'text.message'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'size', 'text.size'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'unit', 'text.unit'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'hex', 'text.color.hex'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'alphaPercent', 'text.color.alphaPercent'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'property', 'animation.property'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'duration', 'animation.duration'),
        ];

        if (newConfig.preventRangesCompute) {
            return results.every(result => result);
        }

        const rangesPath = `ranges`;

        if (this.hasErrorOrRemoveExisting(!newConfig.ranges || newConfig.ranges.length === 0, {
            path: rangesPath,
            code: 'invalid_object',
            message: 'Ranges must exists.'
        })) {
            return false;
        }

        return results
            .concat(this.validateRanges(newConfig.ranges, oldConfig?.ranges, rangesPath))
            .every(result => result);
    }

    /*
    * This method is used to validate a leaf (primitive) of the Glitch configuration.
    * @param configLeaf The new object containing the leaf to validate.
    * @param oldConfigLeaf The old object containing the leaf to validate.
    * @param schemas The object schemas containing the validation rules related to the property.
    * @param leafKey The key of the configLeaf to validate.
    * @param path The full path of the leaf to validate.
    * @returns True if the leaf in configLeaf is valid.
    */
    private validateConfigLeaf<ConfigLeaf, Schemas>(
        configLeaf: ConfigLeaf | undefined,
        oldConfigLeaf: ConfigLeaf | undefined,
        schemas: Record<keyof Schemas, z.ZodTypeAny>,
        leafKey: keyof ConfigLeaf,
        path: string = leafKey as string
    ) {
        const slicedPath = path.split('.').slice(0, -1).join('.');

        if (!configLeaf) {
            this.addError({
                path: slicedPath,
                code: 'invalid_object',
                message: `The object is not defined.`
            });

            return false;
        } else {
            this.removeExistingError(slicedPath);
        }

        const newLeaf = configLeaf[leafKey];
        const oldLeaf = oldConfigLeaf?.[leafKey];

        if (!oldConfigLeaf || newLeaf !== oldLeaf) {
            const schemaKey = leafKey as string as keyof Schemas;
            const validationError = this.validateLeaf(newLeaf, schemas[schemaKey], path);

            if (validationError) {
                this.addError(validationError);

                return false;
            }
        }

        this.removeExistingError(path);

        return true;
    }

    private validateLeaf<Leaf>(value: Leaf, schema: z.ZodTypeAny, path: string): GlitchError | undefined {
        const parseResult = schema.safeParse(value);

        if (!parseResult.success) {
            const issue = parseResult.error.issues[0];

            return {
                path: path,
                code: issue.code,
                message: issue.message
            };
        }
    }

    private validateRanges(ranges: GlitchShadowField[][], oldRanges: GlitchShadowField[][] | undefined, path: string) {
        return ranges
            .map((range, rangeIndex) => {
                const rangePath = `${path}[${rangeIndex}]`;
                const oldRange = oldRanges?.[rangeIndex];

                if (this.hasErrorOrRemoveExisting(!range || range.length === 0, {
                    path: rangePath,
                    code: 'invalid_object',
                    message: `Range must exists and have at least one field.`
                })) {
                    return false;
                }

                return this.validateRange(range, oldRange, path)
            })
            .every(result => result);
    }

    private validateRange(range: GlitchShadowField[], oldRange: GlitchShadowField[] | undefined, path: string) {
        return range
            .map((field, fieldIndex) => {
                const fieldPath = `${path}[${fieldIndex}]`;

                if (this.hasErrorOrRemoveExisting(!field, {
                    path: fieldPath,
                    code: 'invalid_object',
                    message: `The field must exists with all his attributes.`
                })) {
                    return false;
                }

                return this.validateRangeField(field, oldRange?.[fieldIndex], path)
            })
            .every(result => result);
    }

    private validateRangeField(field: GlitchShadowField, oldField: GlitchShadowField | undefined, rangePath: string) {
        const fieldPath = `${rangePath}[${field.index}]`;

        const results = [
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'property', `${fieldPath}.property`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'range', `${fieldPath}.range`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'index', `${fieldPath}.index`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'offsetFrame', `${fieldPath}.offsetFrame`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'offsetX', `${fieldPath}.offsetX`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'offsetY', `${fieldPath}.offsetY`),
            this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'blur', `${fieldPath}.blur`),
            this.validateConfigLeaf(field.color, oldField?.color, glitchColorSchemas, 'hex', `${fieldPath}.color.hex`),
            this.validateConfigLeaf(field.color, oldField?.color, glitchColorSchemas, 'alphaPercent', `${fieldPath}.color.alphaPercent`)
        ];

        return results.every(result => result === true);
    }

    private hasErrorOrRemoveExisting(condition: boolean, error: GlitchError) {
        if (condition) {
            this.addError(error);

            return true;
        } else {
            this.removeExistingError(error.path);
        }
    }

    private addError(newError: GlitchError) {
        const existingError = this.errors[newError.path];

        if (!existingError) {
            this.errors[newError.path] = newError;
        } else {
            this.editError(newError);
        }
    }

    private editError(newError: GlitchError) {
        const internalError = this.errors[newError.path];

        if (internalError.code !== newError.code) {
            internalError.code = newError.code;
            internalError.message = newError.message;
        }
    }

    private removeExistingError(path: string) {
        if (this.errors[path]) {
            delete this.errors[path];
        }
    }

    private onValidated(config: GlitchConfig | undefined) {
        // If the onValidated method is defined, we call it to notify the user about the result.
        // Otherwise, we log the errors in the console.
        if (config?.onValidated && typeof config.onValidated === 'function') {
            const hasErrors = Object.keys(this.errors).length > 0;
            let params: GlitchErrors | undefined;

            if (hasErrors) {
                // We need to clone the object to avoid the reference to the original object.
                params = deepCopy(this.errors)
            }

            config.onValidated(params);
        } else {
            this.logErrors();
        }
    }

    private logErrors() {
        for (const path in this.errors) {
            const error = this.errors[path];
            console.error(`Error: ${error.code} at ${error.path}: ${error.message}`);
        }
    }
}


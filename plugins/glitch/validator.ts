import { z } from 'zod';
import type { 
    GlitchError,
    GlitchConfig,
    GlitchTextShadowField,
    GlitchErrors
} from './types';
import {
    glitchBaseConfigSchemas,
    glitchTextSchemas,
    glitchAnimationSchemas,
    glitchColorSchemas,
    glitchTextShadowFieldSchemas
} from './schemas';

export class GlitchValidator {
    private errors: GlitchErrors;

    constructor() {
        this.errors = {};
    }

    validateConfig(newConfig: GlitchConfig | undefined, oldConfig: GlitchConfig | undefined) {
        const success = this.validateConfigLeafs(newConfig, oldConfig);

        this.onValidated(newConfig);

        if (!success) {
            return false;
        }

        return true;
    }

    onFieldsChange(config: GlitchConfig, fields: GlitchTextShadowField[]) {
        const configRanges = config.ranges;
        
        if (!config.ranges) {
            console.error('Impossible to perform a field change when ranges is not defined.')
    
            return;
        }
    
        fields.forEach((field, fieldIndex) => {
            const configRange = config.ranges[field.range];

            if (!configRange) {
                console.error(`Impossible to perform a field change when the field.range is not an existing index in ranges.`)
            
                return;
            }

            const configRangeField = configRange[field.index];

            if (!configRangeField) {
                console.error(`Impossible to perform a field change when the field.index is not an existing index in ranges[${field.range}].`)

                return;
            }

            this.validateRangeField(undefined, `ranges[${fieldIndex}]`)(field, fieldIndex);
        });
    }

    private validateConfigLeafs(newConfig: GlitchConfig | undefined, oldConfig: GlitchConfig | undefined) {
        if (!newConfig) {
            this.addError({
                path: 'Glitch',
                code: 'invalid_object',
                message: `The Glitch configuration is not defined.`
            });

            return false;
        } else {
            this.removeExistingError('Glitch');
        }

        const newTextLeaf = newConfig.text;
        const newTextColorLeaf = newTextLeaf?.color;
        const newAnimationLeaf = newConfig.animation;
        const oldTextLeaf = oldConfig?.text;
        const oldTextColorLeaf = oldTextLeaf?.color;
        const oldAnimationLeaf = oldConfig?.animation;

        const results = [
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'onValidated'),
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'onFieldsChange'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'message', 'text.message'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'size', 'text.size'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'unit', 'text.unit'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'hex', 'text.color.hex'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'alphaPercent', 'text.color.alphaPercent'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'property', 'animation.property'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'duration', 'animation.duration'),
        ];

        const rangesPath = `ranges`;

        if (!newConfig.ranges || newConfig.ranges.length === 0) {
            this.addError({
                path: rangesPath,
                code: 'invalid_object',
                message: 'Ranges must exists and have at least one range.'
            });

            return false;
        } else {
            this.removeExistingError(rangesPath);
        }

        if (newConfig.preventRangesValidation) {
            return results.every(result => result);
        }

        return results
            .concat(newConfig.ranges.map(this.validateRange(oldConfig?.ranges, rangesPath)))
            .every(result => result);
    }

    private validateConfigLeaf<ConfigLeaf, Schemas>(
        newConfig: ConfigLeaf | undefined,
        oldConfig: ConfigLeaf | undefined,
        schemas: Record<keyof Schemas, z.ZodTypeAny>,
        configProperty: keyof ConfigLeaf,
        path: string = configProperty as string
    ) {
        const pathSplit = path.split('.');
        const slicedPath = pathSplit.slice(0, -1).join('.');

        if (!newConfig) {
            this.addError({
                path: slicedPath,
                code: 'invalid_object',
                message: `The object is not defined.`
            });

            return false;
        } else {
            this.removeExistingError(slicedPath);
        }

        const newLeaf = newConfig[configProperty];
        const oldLeaf = oldConfig?.[configProperty];

        if (!oldConfig || newLeaf !== oldLeaf) {
            const schemaProperty = configProperty as string as keyof Schemas;
            const validationError = this.validateLeaf(newLeaf, schemas[schemaProperty], path);

            if (validationError) {
                this.addError(validationError);

                return false;
            }
        }

        this.removeExistingError(path);

        return true;
    }

    private validateLeaf<Leaf>(value: Leaf, schema: z.ZodTypeAny, path: string): GlitchError | undefined {
        const parsed = schema.safeParse(value);

        if (!parsed.success) {
            const issue = parsed.error.issues[0];

            return {
                path: path,
                code: issue.code,
                message: issue.message
            };
        }
    }

    private validateRange(oldRanges: GlitchTextShadowField[][] | undefined, path: string) {
        return (range: GlitchTextShadowField[] | undefined, rangeIndex: number) => {
            const rangePath = `${path}[${rangeIndex}]`;
            const oldRange = oldRanges?.[rangeIndex];

            if (!range || range.length === 0) {
                this.addError({
                    path: rangePath,
                    code: 'invalid_object',
                    message: `Range must exists and have at least one field.`
                });

                return false;
            } else {
                this.removeExistingError(rangePath);
            }

            return range
                .map(this.validateRangeField(oldRange?.[rangeIndex], rangePath))
                .every(result => result);
        }
    }

    private validateRangeField(oldField: GlitchTextShadowField | undefined, rangePath: string) {
        return (field: GlitchTextShadowField, fieldIndex: number) => {
            const fieldPath = `${rangePath}[${fieldIndex}]`;

            if (!field) {
                this.addError({
                    path: fieldPath,
                    code: 'invalid_object',
                    message: `The field must exists with all his attributes.`
                });

                return false;
            } else {
                this.removeExistingError(fieldPath);
            }

            const results = [
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'range', `${fieldPath}.range`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'index', `${fieldPath}.index`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'startPercent', `${fieldPath}.startPercent`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'endPercent', `${fieldPath}.endPercent`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'offsetX', `${fieldPath}.offsetX`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'offsetY', `${fieldPath}.offsetY`),
                this.validateConfigLeaf(field, oldField, glitchTextShadowFieldSchemas, 'blur', `${fieldPath}.blur`),
                this.validateConfigLeaf(field.color, oldField?.color, glitchColorSchemas, 'hex', `${fieldPath}.color.hex`),
                this.validateConfigLeaf(field.color, oldField?.color, glitchColorSchemas, 'alphaPercent', `${fieldPath}.color.alphaPercent`)
            ];

            return results.every(result => result === true);
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
        if (config?.onValidated && typeof config.onValidated === 'function') {
            const hasErrors = Object.keys(this.errors).length > 0;
            let params: GlitchErrors | undefined;

            if (hasErrors) {
                // We need to clone the object to avoid the reference to the original object.
                params = JSON.parse(JSON.stringify(this.errors))
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


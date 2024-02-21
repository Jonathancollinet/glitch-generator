import { z } from 'zod';
import { type GlitchError, type GlitchConfig, type GlitchTextShadowField, type FieldActionsValues } from './types';
import {
    glitchBaseConfigSchemas,
    glitchTextSchemas,
    glitchAnimationSchemas,
    glitchColorSchemas,
    glitchTextShadowFieldSchemas
} from './schemas';

export class GlitchValidator {
    private errors: GlitchError[];

    constructor() {
        this.errors = [];
    }

    validateConfig(newConfig: GlitchConfig | undefined, oldConfig: GlitchConfig | undefined) {
        if (!newConfig) {
            this.addError({
                path: '',
                code: 'missing',
                message: `The Glitch configuration is not defined.`
            });
            return false;
        } else {
            this.removeExistingError('');
        }

        const success = this.validateConfigLeafs(newConfig, oldConfig);

        if (!success) {
            this.emitErrors(newConfig);
            return false;
        }

        return true;
    }

    onFieldChange(field: GlitchTextShadowField, action: FieldActionsValues) {
        // to be implemented
    }

    private validateConfigLeafs(newConfig: GlitchConfig, oldConfig: GlitchConfig | undefined) {
        const newTextLeaf = newConfig.text;
        const newTextColorLeaf = newTextLeaf?.color;
        const newAnimationLeaf = newConfig.animation;
        const oldTextLeaf = oldConfig?.text;
        const oldTextColorLeaf = oldTextLeaf?.color;
        const oldAnimationLeaf = oldConfig?.animation;

        const results = [
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, 'onErrors'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'message', 'text.message'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'size', 'text.size'),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, 'unit', 'text.unit'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'hex', 'text.color.hex'),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, 'alphaPercent', 'text.color.alphaPercent'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'property', 'animation.property'),
            this.validateConfigLeaf(newAnimationLeaf, oldAnimationLeaf, glitchAnimationSchemas, 'duration', 'animation.duration'),
        ];

        const path = 'ranges';

        if (!newConfig.ranges || newConfig.ranges.length === 0) {
            this.addError({
                path,
                code: 'ranges_empty',
                message: 'Ranges must exists and have at least one range.'
            });

            return false;
        } else {
            this.removeExistingError(path);
        }

        // Performance optimization:
        // if preventFieldValidation is true, we don't need to validate the fields
        // the user will call the onFieldChange method to validate the fields
        if (newConfig.preventFieldValidation) {
            return results.every(result => result);
        }

        return results
            .concat(newConfig.ranges.map(this.validateRange(oldConfig?.ranges, path)))
            .every(result => result);
    }

    private validateConfigLeaf<ConfigLeaf, Schemas>(
        newConfig: ConfigLeaf | undefined,
        oldConfig: ConfigLeaf | undefined,
        schemas: Record<keyof Schemas, z.ZodTypeAny>,
        configProperty: keyof ConfigLeaf,
        path: string = configProperty as string
    ) {
        if (!newConfig) {
            const pathSplit = path.split('.');
            const slicedPath = pathSplit.length > 1 ? pathSplit.slice(0, -1).join('.') : path;

            this.addError({
                path: slicedPath,
                code: 'invalid_object',
                message: `The object is not defined.`
            });

            return false;
        } else {
            this.removeExistingError(path);
        }

        const newLeaf = newConfig[configProperty];
        const oldLeaf = oldConfig?.[configProperty];

        if (!oldConfig || newLeaf !== oldLeaf) {
            const schemaProperty = configProperty as string as keyof Schemas;
            const validationError = this.validateLeaf(newLeaf, schemas[schemaProperty], path);

            if (validationError) {
                this.addError(validationError);

                return false;
            } else {
                this.removeExistingError(path);
            }
        }
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
                    code: 'range_empty',
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
                    code: 'field_empty',
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
        const existingErrorIndex = this.errors.findIndex(this.isSameErrorPath(newError));

        if (existingErrorIndex === -1) {
            this.errors.push(newError);
        } else {
            this.editError(existingErrorIndex, newError);
        }
    }

    private editError(existingErrorIndex: number, newError: GlitchError) {
        const internalError = this.errors[existingErrorIndex];

        if (internalError.code !== newError.code) {
            internalError.code = newError.code;
            internalError.message = newError.message;
        }
    }

    private removeExistingError(path: string) {
        const index = this.errors.findIndex(this.isSamePath(path));

        if (index !== -1) {
            this.errors.splice(index, 1);
        }
    }

    private isSameErrorPath(error: GlitchError) {
        return this.isSamePath(error.path);
    }

    private isSamePath(path: string) {
        return (error: GlitchError) => error.path === path;
    }

    private emitErrors(config: GlitchConfig | undefined) {
        if (config?.onErrors && typeof config.onErrors === 'function') {
            config.onErrors(this.errors);
        } else {
            this.logErrors();
        }
    }

    private logErrors() {
        this.errors.forEach(error => {
            console.error(`Error: ${error.code} at ${error.path}: ${error.message}`);
        });
    }
}


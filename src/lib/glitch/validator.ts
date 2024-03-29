import { z } from "zod";
import G from "./types";
import {
    glitchBaseConfigSchemas,
    glitchTextSchemas,
    glitchAnimationSchemas,
    glitchColorSchemas,
    glitchPropertySchemas,
    glitchFieldSchemas,
} from "./schemas";

export default class GlitchValidator {
    private errors: G.Errors;

    constructor() {
        this.errors = {};
    }

    validateConfigWithErrors(newConfig: G.Config, oldConfig: G.Config | undefined) {
        const oldErrors = deepCopy(this.errors);

        this.errors = {};
        this.validateConfigLeafs(newConfig, oldConfig);

        const newErrors = deepCopy(this.errors);

        this.errors = oldErrors;

        return newErrors;
    }

    validateConfig(newConfig: G.Config, oldConfig: G.Config | undefined) {
        const success = this.validateConfigLeafs(newConfig, oldConfig);

        this.onValidated(newConfig);

        if (!success) {
            return false;
        }

        return true;
    }

    validateFields(config: G.Config, fields: G.Field[]) {
        const success = this.validateFieldsLeafs(config, fields);

        this.onValidated(config);

        if (!success) {
            return false;
        }

        return true;
    }

    private validateFieldsLeafs(config: G.Config, fields: G.Field[]) {
        const results: boolean[] = [];
        const configRanges = config.ranges;
        const pathRanges = "ranges";

        if (
            this.hasErrorOrRemoveExisting(!configRanges, {
                path: pathRanges,
                code: "invalid_object",
                message: `The ranges are not defined.`,
            })
        ) {
            return false;
        }

        for (let fieldIndex = 0, len = fields.length; fieldIndex < len; fieldIndex++) {
            const field = fields[fieldIndex];
            const configRange = configRanges[field.range];
            const rangePath = `${pathRanges}[${field.range}]`;

            if (
                this.hasErrorOrRemoveExisting(!configRange, {
                    path: rangePath,
                    code: "invalid_object",
                    message: `Impossible to perform a field change where the ${field.range} is not an existing index in ranges.`,
                })
            ) {
                return false;
            }

            const configRangeField = configRange[field.index];
            const configRangeFieldPath = `${rangePath}[${field.index}]`;

            if (
                this.hasErrorOrRemoveExisting(!configRangeField, {
                    path: configRangeFieldPath,
                    code: "invalid_object",
                    message: `Impossible to perform a field change where the ${field.index} is not an existing index in ${rangePath}.`,
                })
            ) {
                return false;
            }

            results.push(this.validateRangeField(field, undefined, `ranges[${field.range}]`));
        }

        return results.every((result) => result);
    }

    private validateConfigLeafs(newConfig: G.Config, oldConfig: G.Config | undefined) {
        if (
            this.hasErrorOrRemoveExisting(!newConfig, {
                path: "Glitch",
                code: "invalid_object",
                message: `The Glitch configuration is not defined.`,
            })
        ) {
            return false;
        }

        const newTextLeaf = newConfig.text;
        const newTextColorLeaf = newTextLeaf?.color;
        const newAnimationLeaf = newConfig.animation;
        const oldTextLeaf = oldConfig?.text;
        const oldTextColorLeaf = oldTextLeaf?.color;
        const oldAnimationLeaf = oldConfig?.animation;

        const results = [
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, "onValidated"),
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, "preventRangesCompute"),
            this.validateConfigLeaf(newConfig, oldConfig, glitchBaseConfigSchemas, "controls"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "message", "text.message"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "size", "text.size"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "unit", "text.unit"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "height", "text.height"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "padding", "text.padding"),
            this.validateConfigLeaf(newTextLeaf, oldTextLeaf, glitchTextSchemas, "borderRadius", "text.borderRadius"),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, "hex", "text.color.hex"),
            this.validateConfigLeaf(
                newTextColorLeaf,
                oldTextColorLeaf,
                glitchColorSchemas,
                "alphaPercent",
                "text.color.alphaPercent",
            ),
            this.validateConfigLeaf(newTextColorLeaf, oldTextColorLeaf, glitchColorSchemas, "hex", "text.bgColor.hex"),
            this.validateConfigLeaf(
                newTextColorLeaf,
                oldTextColorLeaf,
                glitchColorSchemas,
                "alphaPercent",
                "text.bgColor.alphaPercent",
            ),
            this.validateConfigLeaf(
                newAnimationLeaf,
                oldAnimationLeaf,
                glitchAnimationSchemas,
                "duration",
                "animation.duration",
            ),
        ];

        if (newConfig.preventRangesCompute) {
            return results.every((result) => result);
        }

        const rangesPath = `ranges`;

        if (
            this.hasErrorOrRemoveExisting(!newConfig.ranges || newConfig.ranges.length === 0, {
                path: rangesPath,
                code: "invalid_object",
                message: "Ranges must exists.",
            })
        ) {
            return false;
        }

        return results
            .concat(this.validateRanges(newConfig.ranges, oldConfig?.ranges, rangesPath))
            .every((result) => result);
    }

    private validateConfigLeaf<ConfigLeaf, Schemas>(
        configLeaf: ConfigLeaf | undefined,
        oldConfigLeaf: ConfigLeaf | undefined,
        schemas: Record<keyof Schemas, z.ZodTypeAny>,
        leafKey: keyof ConfigLeaf,
        path: string = leafKey as string,
    ) {
        const slicedPath = path.split(".").slice(0, -1).join(".");

        if (!configLeaf) {
            this.addError({
                path: slicedPath,
                code: "invalid_object",
                message: `The object is not defined.`,
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

    private validateLeaf<Leaf>(value: Leaf, schema: z.ZodTypeAny, path: string): G.Error | undefined {
        const parseResult = schema.safeParse(value);

        if (!parseResult.success) {
            const issue = parseResult.error.issues[0];

            return {
                path: path,
                code: issue.code,
                message: issue.message,
            };
        }
    }

    private validateRanges(ranges: G.Field[][], oldRanges: G.Field[][] | undefined, path: string) {
        return ranges
            .map((range, rangeIndex) => {
                const rangePath = `${path}[${rangeIndex}]`;
                const oldRange = oldRanges?.[rangeIndex];

                if (
                    this.hasErrorOrRemoveExisting(!range || range.length === 0, {
                        path: rangePath,
                        code: "invalid_object",
                        message: `Range must exists and have at least one field.`,
                    })
                ) {
                    return false;
                }

                return this.validateRange(range, oldRange, path);
            })
            .every((result) => result);
    }

    private validateRange(range: G.Field[], oldRange: G.Field[] | undefined, path: string) {
        return range
            .map((field, fieldIndex) => {
                const fieldPath = `${path}[${fieldIndex}]`;

                if (
                    this.hasErrorOrRemoveExisting(!field, {
                        path: fieldPath,
                        code: "invalid_object",
                        message: `The field must exists with all his attributes.`,
                    })
                ) {
                    return false;
                }

                return this.validateRangeField(field, oldRange?.[fieldIndex], path);
            })
            .every((result) => result);
    }

    private validateRangeField(field: G.Field, oldField: G.Field | undefined, rangePath: string) {
        const fieldPath = `${rangePath}[${field.index}]`;

        const results = [
            this.validateConfigLeaf(field, oldField, glitchFieldSchemas, "range", `${fieldPath}.range`),
            this.validateConfigLeaf(field, oldField, glitchFieldSchemas, "index", `${fieldPath}.index`),
            this.validateConfigLeaf(field, oldField, glitchFieldSchemas, "offsetFrame", `${fieldPath}.offsetFrame`),
        ];

        return results
            .concat(this.validateFieldProperties(field.shadows, oldField?.shadows, fieldPath))
            .every((result) => result === true);
    }

    private validateFieldProperties(shadows: G.Shadows, oldProperties: G.Shadows | undefined, fieldPath: string) {
        const propertiesPath = `${fieldPath}.shadows`;
        let results: boolean[] = [];
        let propertyName: keyof typeof shadows;

        if (
            this.hasErrorOrRemoveExisting(!shadows, {
                path: propertiesPath,
                code: "invalid_object",
                message: `The field's properties must exists with all his attributes.`,
            })
        ) {
            return false;
        }

        for (propertyName in shadows) {
            const propertyPath = `${propertiesPath}.${propertyName}`;

            if (
                this.hasErrorOrRemoveExisting(!shadows[propertyName], {
                    path: propertiesPath,
                    code: "invalid_object",
                    message: `The property ${propertyName} is null or undefined.`,
                })
            ) {
                results.push(false);

                continue;
            }

            results = results.concat(
                ...[
                    this.validateConfigLeaf(
                        shadows[propertyName],
                        oldProperties?.[propertyName],
                        glitchPropertySchemas,
                        "enabled",
                        `${propertyPath}.enabled`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName],
                        oldProperties?.[propertyName],
                        glitchPropertySchemas,
                        "offsetX",
                        `${propertyPath}.offsetX`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName],
                        oldProperties?.[propertyName],
                        glitchPropertySchemas,
                        "offsetY",
                        `${propertyPath}.offsetY`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName],
                        oldProperties?.[propertyName],
                        glitchPropertySchemas,
                        "blur",
                        `${propertyPath}.blur`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName],
                        oldProperties?.[propertyName],
                        glitchPropertySchemas,
                        "spread",
                        `${propertyPath}.spread`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName]?.color,
                        oldProperties?.[propertyName]?.color,
                        glitchColorSchemas,
                        "hex",
                        `${propertyPath}.color.hex`,
                    ),
                    this.validateConfigLeaf(
                        shadows[propertyName]?.color,
                        oldProperties?.[propertyName]?.color,
                        glitchColorSchemas,
                        "alphaPercent",
                        `${propertyPath}.color.alphaPercent`,
                    ),
                ],
            );
        }

        return results.every((result) => result);
    }

    private hasErrorOrRemoveExisting(condition: boolean, error: G.Error) {
        if (condition) {
            this.addError(error);

            return true;
        } else {
            this.removeExistingError(error.path);
        }
    }

    private addError(newError: G.Error) {
        const existingError = this.errors[newError.path];

        if (!existingError) {
            this.errors[newError.path] = newError;
        } else {
            this.editError(newError);
        }
    }

    private editError(newError: G.Error) {
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

    private onValidated(config: G.Config | undefined) {
        if (config?.onValidated && typeof config.onValidated === "function") {
            const hasErrors = Object.keys(this.errors).length > 0;
            let params: G.Errors | undefined;

            if (hasErrors) {
                params = deepCopy(this.errors);
            }

            config.onValidated(params);
        }

        this.logErrors();
    }

    private logErrors() {
        for (const path in this.errors) {
            const error = this.errors[path];

            console.error(`Error: ${error.code} at ${error.path}: ${error.message}`);
        }
    }
}

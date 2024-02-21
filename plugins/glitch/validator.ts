import { z } from 'zod';
import { GlitchAnimationProperty, GlitchUnit, type GlitchError, type GlitchConfig } from './types';

const PercentSchema = z.number().int().gte(0).lte(100);

const GlitchErrorSchema = z.object({
    property: z.string(),
    code: z.string(),
    message: z.string()
});

const GlitchColorSchema = z.object({
    hex: z.string(),
    alphaPercent: PercentSchema
});

const GlitchTextShadowFieldSchema = z.object({
    range: z.number(),
    index: z.number(),
    startPercent: PercentSchema,
    endPercent: PercentSchema,
    color: GlitchColorSchema,
    offsetX: z.number(),
    offsetY: z.number(),
    blur: z.number()
});

const glitchConfigLeafSchema = {
    onErrors: z.function().args(z.array(GlitchErrorSchema)).returns(z.void()).optional(),
    text: {
        message: z.string(),
        size: z.number(),
        unit: z.nativeEnum(GlitchUnit),
        color: {
            hex: z.string(),
            alphaPercent: PercentSchema
        },
    },
    animation: {
        property: z.nativeEnum(GlitchAnimationProperty),
        duration: z.number()
    },
    ranges: z.array(z.array(GlitchTextShadowFieldSchema)),
    field: {
        range: z.number(),
        index: z.number(),
        startPercent: PercentSchema,
        endPercent: PercentSchema,
        color: {
            hex: z.string(),
            alphaPercent: PercentSchema
        },
        offsetX: z.number(),
        offsetY: z.number(),
        blur: z.number()

    }
}

function validateConfigLeaf<T, U extends z.ZodType>(configValue: T, schema: U, path: string): GlitchError | undefined {
    const parsed = schema.safeParse(configValue);

    if (!parsed.success) {
        const issue = parsed.error.issues[0];

        return {
            property: path,
            code: issue.code,
            message: issue.message
        };
    }
}

function validateConfigLeafs(config: GlitchConfig, oldConfig: GlitchConfig) {
    const errors: GlitchError[] = [];

    if (config.onErrors !== oldConfig.onErrors) {
        const err = validateConfigLeaf(config.onErrors, glitchConfigLeafSchema.onErrors, 'onErrors');

        if (err) {
            errors.push(err);
        }
    }

    if (config.text.message !== oldConfig.text.message) {
        const err = validateConfigLeaf(config.text.message, glitchConfigLeafSchema.text.message, 'text.message');

        if (err) {
            errors.push(err);
        }
    }

    if (config.text.size !== oldConfig.text.size) {
        const err = validateConfigLeaf(config.text.size, glitchConfigLeafSchema.text.size, 'text.size');

        if (err) {
            errors.push(err);
        }
    }

    if (config.text.unit !== oldConfig.text.unit) {
        const err = validateConfigLeaf(config.text.unit, glitchConfigLeafSchema.text.unit, 'text.unit');

        if (err) {
            errors.push(err);
        }
    }

    if (config.text.color.hex !== oldConfig.text.color.hex) {
        const err = validateConfigLeaf(config.text.color.hex, glitchConfigLeafSchema.text.color.hex, 'text.color.hex');

        if (err) {
            errors.push(err);
        }
    }

    if (config.text.color.alphaPercent !== oldConfig.text.color.alphaPercent) {
        const err = validateConfigLeaf(config.text.color.alphaPercent, glitchConfigLeafSchema.text.color.alphaPercent, 'text.color.alphaPercent');

        if (err) {
            errors.push(err);
        }
    }

    if (config.animation.property !== oldConfig.animation.property) {
        const err = validateConfigLeaf(config.animation.property, glitchConfigLeafSchema.animation.property, 'animation.property');

        if (err) {
            errors.push(err);
        }
    }

    if (config.animation.duration !== oldConfig.animation.duration) {
        const err = validateConfigLeaf(config.animation.duration, glitchConfigLeafSchema.animation.duration, 'animation.duration');

        if (err) {
            errors.push(err);
        }
    }    

    validateConfigLeaf(config.ranges, glitchConfigLeafSchema.ranges, 'fields')

    config.ranges.forEach((field, range) => {
        field.forEach((subField, index) => {
            const path = `range[${range}].field[${index}]`;
            
            if (subField.range !== oldConfig.ranges[range][index].range) {
                const err = validateConfigLeaf(subField.range, glitchConfigLeafSchema.field.range, `${path}.range`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.index !== oldConfig.ranges[range][index].index) {
                const err = validateConfigLeaf(subField.index, glitchConfigLeafSchema.field.index, `${path}.index`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.startPercent !== oldConfig.ranges[range][index].startPercent) {
                const err = validateConfigLeaf(subField.startPercent, glitchConfigLeafSchema.field.startPercent, `${path}.startPercent`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.endPercent !== oldConfig.ranges[range][index].endPercent) {
                const err = validateConfigLeaf(subField.endPercent, glitchConfigLeafSchema.field.endPercent, `${path}.endPercent`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.color.hex !== oldConfig.ranges[range][index].color.hex) {
                const err = validateConfigLeaf(subField.color.hex, glitchConfigLeafSchema.field.color.hex, `${path}.color.hex`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.color.alphaPercent !== oldConfig.ranges[range][index].color.alphaPercent) {
                const err = validateConfigLeaf(subField.color.alphaPercent, glitchConfigLeafSchema.field.color.alphaPercent, `${path}.color.alphaPercent`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.offsetX !== oldConfig.ranges[range][index].offsetX) {
                const err = validateConfigLeaf(subField.offsetX, glitchConfigLeafSchema.field.offsetX, `${path}.offsetX`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.offsetY !== oldConfig.ranges[range][index].offsetY) {
                const err = validateConfigLeaf(subField.offsetY, glitchConfigLeafSchema.field.offsetY, `${path}.offsetY`);

                if (err) {
                    errors.push(err);
                }
            }

            if (subField.blur !== oldConfig.ranges[range][index].blur) {
                const err = validateConfigLeaf(subField.blur, glitchConfigLeafSchema.field.blur, `${path}.blur`);

                if (err) {
                    errors.push(err);
                }
            }
        });
    });

    return errors
}

export function validateConfig(config: GlitchConfig, oldConfig: GlitchConfig) {
    return validateConfigLeafs(config, oldConfig);
}

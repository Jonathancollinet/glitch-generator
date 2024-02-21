import { z } from 'zod';
import { FieldActions, GlitchAnimationProperty, GlitchUnit } from './types';

const percentSchema = z.number().int().gte(0).lte(100);

export const glitchErrorSchemas = {
    property: z.string(),
    code: z.string(),
    message: z.string()
};

export const glitchColorSchemas = {
    hex: z.string(),
    alphaPercent: percentSchema
};

export const glitchTextShadowFieldSchemas = {
    range: z.number(),
    index: z.number(),
    startPercent: percentSchema,
    endPercent: percentSchema,
    offsetX: z.number(),
    offsetY: z.number(),
    blur: z.number()
};

export const glitchAnimationSchemas = {
    property: z.nativeEnum(GlitchAnimationProperty),
    duration: z.number()
};

export const glitchTextSchemas = {
    size: z.number(),
    unit: z.nativeEnum(GlitchUnit),
    message: z.string()
};

export const glitchBaseConfigSchemas = {
    onErrors: z.function().args(z.array(z.object(glitchErrorSchemas))).returns(z.void()).optional(),
    onFieldChange: z.function().args(z.object(glitchTextShadowFieldSchemas), z.nativeEnum(FieldActions)).returns(z.void()).optional()
}
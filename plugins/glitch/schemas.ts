import { z } from 'zod';
import { GlitchAnimationProperty, GlitchUnit } from './types';

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
    size: z.number().positive().lte(256),
    unit: z.nativeEnum(GlitchUnit),
    message: z.string()
};

export const glitchBaseConfigSchemas = {
    onValidated: z.function().returns(z.void()).optional(),
    onFieldsChange: z.function().returns(z.void()).optional()
}
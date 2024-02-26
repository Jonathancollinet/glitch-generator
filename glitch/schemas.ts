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
    alphaPercent: z.number().int().gte(0).lte(1000)
};

export const glitchTextShadowFieldSchemas = {
    property: z.nativeEnum(GlitchAnimationProperty).optional(),
    range: z.number(),
    index: z.number(),
    offsetFrame: percentSchema,
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
    preventRangesCompute: z.boolean().optional(),
    fillAllFrames: z.boolean(),
    controls: z.boolean(),
}
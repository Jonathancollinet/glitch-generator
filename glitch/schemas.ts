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
    alphaPercent: z.number().int().gte(0).lte(100)
};

export const glitchShadowPropertySchemas = {
    enabled: z.boolean(),
    offsetX: z.number(),
    offsetY: z.number(),
    blur: z.number().gte(0),
    spread: z.number().gte(0).optional()
};

export const glitchTextShadowFieldSchemas = {
    range: z.number(),
    index: z.number(),
    offsetFrame: percentSchema,
};

export const glitchAnimationSchemas = {
    duration: z.number().gte(0)
};

export const glitchTextSchemas = {
    size: z.number().positive().lte(256),
    height: z.number().gte(0).lte(256),
    padding: z.number().gte(0).lte(256),
    borderRadius: z.number().gte(0).lte(256),
    unit: z.nativeEnum(GlitchUnit),
    message: z.string()
};

export const glitchBaseConfigSchemas = {
    onValidated: z.function().returns(z.void()).optional(),
    preventRangesCompute: z.boolean().optional(),
    fillAllFrames: z.boolean(),
    controls: z.boolean(),
}
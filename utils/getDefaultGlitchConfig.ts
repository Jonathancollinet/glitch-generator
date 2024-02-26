import {
    GlitchUnit,
    GlitchAnimationProperty,
} from '~/glitch/types';

import type {
    GlitchConfig
} from '~/glitch/types'

const defaultGlitchConfig: GlitchConfig = {
    controls: true,
    text: {
        size: 16,
        unit: GlitchUnit.Pixel,
        color: {
            hex: '#000000',
            alphaPercent: 100
        },
        message: 'Hi world!'
    },
    animation: {
        duration: 3000
    },
    ranges: defaultTextShadowRanges
}

export function getDefaultGlitchConfig() {
    return deepCopy(defaultGlitchConfig);
}

import {
    GlitchUnit,
    GlitchAnimationProperty,
} from '~/glitch/types';

import type {
    GlitchConfig
} from '~/glitch/types'

const DefaultGlitchConfig: GlitchConfig = {
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
        property: GlitchAnimationProperty.TextShadow,
        duration: 3000
    },
    ranges: defaultTextShadowRanges
}

export default DefaultGlitchConfig;


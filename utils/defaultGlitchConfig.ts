import {
    GlitchUnit,
    GlitchAnimationProperty,
} from '~/plugins/glitch/types';

import type {
    GlitchConfig, GlitchTextShadowField,
} from '~/plugins/glitch/types'

const _defaultGlichConfig: GlitchConfig = {
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
        duration: 1000
    },
    ranges: defaultTextShadowRanges
}

export default _defaultGlichConfig;


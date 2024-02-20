import {
    GlitchUnit,
    GlitchAnimationProperty,
} from '~/plugins/glitch/types';

import type {
    _GlitchConfig,
} from '~/plugins/glitch/types'

const _defaultGlichConfig: _GlitchConfig = {
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
    ranges: [
        [
            {
                range: 0,
                index: 0,
                startPercent: 0,
                endPercent: 40,
                color: {
                    hex: '#000000',
                    alphaPercent: 100
                },
                offsetX: 0,
                offsetY: 0,
                blur: 0
            },
            {
                range: 0,
                index: 1,
                startPercent: 40,
                endPercent: 60,
                color: {
                    hex: '#ff0000',
                    alphaPercent: 100
                },
                offsetX: -10,
                offsetY: -10,
                blur: 0
            },
            {
                range: 0,
                index: 2,
                startPercent: 60,
                endPercent: 100,
                color: {
                    hex: '#000000',
                    alphaPercent: 100
                },
                offsetX: 0,
                offsetY: 0,
                blur: 0
            }
        ]
    ]
}

export default _defaultGlichConfig;
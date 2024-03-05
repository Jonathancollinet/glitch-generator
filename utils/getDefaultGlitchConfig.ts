import { GlitchUnit } from '~/glitch/types';
import type { GlitchConfig } from '~/glitch/types'

const defaultGlitchConfig: GlitchConfig = {
    controls: true,
    text: {
        size: 42,
        unit: GlitchUnit.Pixel,
        height: 0,
        padding: 0,
        bgColor: {
            hex: '#ffffff',
            alphaPercent: 0
        },
        color: {
            hex: '#000000',
            alphaPercent: 100
        },
        message: 'Animate me!'
    },
    animation: {
        duration: 3000
    },
    ranges: [
        [getDefaultField(0, 0, 0)]
    ]
}

export function getDefaultGlitchConfig() {
    return deepCopy(defaultGlitchConfig);
}

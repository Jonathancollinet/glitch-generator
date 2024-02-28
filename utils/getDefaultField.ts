import { GlitchAnimationProperty, type GlitchShadowField } from "../glitch/types";

const defaultField: GlitchShadowField = {
    range: 0,
    index: 0,
    offsetFrame: 0,
    properties: {
        [GlitchAnimationProperty.TextShadow]: {
            enabled: false,
            fillAllFrames: false,
            color: {
                hex: "#000000",
                alphaPercent: 100
            },
            blur: 0,
            offsetX: 0,
            offsetY: 0
        },
        [GlitchAnimationProperty.BoxShadow]: {
            enabled: false,
            fillAllFrames: false,
            color: {
                hex: "#000000",
                alphaPercent: 100
            },
            blur: 0,
            offsetX: 0,
            offsetY: 0,
            spread: 0
        },
    }
}

export default function getDefaultField(range: number, index: number, offset: number) {
    return {
        ...deepCopy(defaultField),
        range,
        index,
        offsetFrame: offset
    }
}
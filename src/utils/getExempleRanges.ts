import { GlitchAnimationProperty } from "~/glitch/types"

export default () => {
    return [
        [
            {
                range: 0,
                index: 0,
                offsetFrame: 0,
                properties: {
                    [GlitchAnimationProperty.TextShadow]: {
                        enabled: true,
                        fillAllFrames: false,
                        color: {
                            hex: "#F45B69",
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
                            hex: "#724cf9",
                            alphaPercent: 100
                        },
                        blur: 0,
                        offsetX: 0,
                        offsetY: 0,
                        spread: 0
                    },
                }
            },
            {
                range: 0,
                index: 1,
                offsetFrame: 50,
                properties: {
                    [GlitchAnimationProperty.TextShadow]: {
                        enabled: true,
                        fillAllFrames: false,
                        color: {
                            hex: "#724cf9",
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
                            hex: "#724cf9",
                            alphaPercent: 100
                        },
                        blur: 0,
                        offsetX: 0,
                        offsetY: 0,
                        spread: 0
                    },
                }
            }
        ]
    ]
}
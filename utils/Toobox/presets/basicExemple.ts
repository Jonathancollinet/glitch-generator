import { GlitchAnimationProperty, GlitchUnit } from "~/glitch/types";

export default deepCopy({
    text: {
        size: 42,
        unit: GlitchUnit.Pixel,
        height: 0,
        padding: 0,
        borderRadius: 0,
        bgColor: {
            hex: '#ffffff',
            alphaPercent: 0
        },
        color: {
            hex: '#000000',
            alphaPercent: 100
        },
        message: 'Exemple'
    },
    animation: {
        duration: 3000
    },
    ranges: [
        [
            getDefaultField(0, 0, 0),
            {
                range: 0,
                index: 1,
                offsetFrame: 25,
                properties: {
                    [GlitchAnimationProperty.TextShadow]: {
                        enabled: true,
                        fillAllFrames: true,
                        color: {
                            hex: "#ff0000",
                            alphaPercent: 100
                        },
                        blur: 0,
                        offsetX: 50,
                        offsetY: 25
                    },
                    [GlitchAnimationProperty.BoxShadow]: {
                        enabled: false,
                        fillAllFrames: true,
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
                index: 2,
                offsetFrame: 50,
                properties: {
                    [GlitchAnimationProperty.TextShadow]: {
                        enabled: true,
                        fillAllFrames: true,
                        color: {
                            hex: "#00ff00",
                            alphaPercent: 100
                        },
                        blur: 10,
                        offsetX: 75,
                        offsetY: 50
                    },
                    [GlitchAnimationProperty.BoxShadow]: {
                        enabled: false,
                        fillAllFrames: true,
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
            getDefaultField(0, 3, 75),
        ]
    ],
})
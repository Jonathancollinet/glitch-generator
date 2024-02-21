import type { GlitchTextShadowField } from "~/plugins/glitch/types";

const _defaultTextShadowRange: GlitchTextShadowField[][] = [
    [
        {
            range: 0,
            index: 0,
            startPercent: 0,
            endPercent: 4,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 1,
            startPercent: 5,
            endPercent: 10,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 2,
            startPercent: 11,
            endPercent: 13,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 3,
            startPercent: 14,
            endPercent: 15,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 4,
            startPercent: 16,
            endPercent: 20,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 5,
            startPercent: 21,
            endPercent: 25,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 6,
            startPercent: 26,
            endPercent: 27,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0.8,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 7,
            startPercent: 28,
            endPercent: 30,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 8,
            startPercent: 31,
            endPercent: 34,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 9,
            startPercent: 35,
            endPercent: 37,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 10,
            startPercent: 38,
            endPercent: 40,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 11,
            startPercent: 41,
            endPercent: 41,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 45,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 12,
            startPercent: 42,
            endPercent: 42,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 13,
            startPercent: 43,
            endPercent: 45,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 14,
            startPercent: 46,
            endPercent: 47,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 15,
            startPercent: 48,
            endPercent: 50,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 16,
            startPercent: 51,
            endPercent: 54,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 17,
            startPercent: 55,
            endPercent: 55,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 18,
            startPercent: 56,
            endPercent: 57,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 19,
            startPercent: 58,
            endPercent: 60,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 20,
            startPercent: 61,
            endPercent: 61,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 30,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 21,
            startPercent: 62,
            endPercent: 62,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 22,
            startPercent: 63,
            endPercent: 65,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 23,
            startPercent: 66,
            endPercent: 66,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 24,
            startPercent: 67,
            endPercent: 67,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 25,
            startPercent: 68,
            endPercent: 70,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 26,
            startPercent: 71,
            endPercent: 71,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 50,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 27,
            startPercent: 72,
            endPercent: 72,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 28,
            startPercent: 73,
            endPercent: 76,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 29,
            startPercent: 77,
            endPercent: 80,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 30,
            startPercent: 81,
            endPercent: 82,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 31,
            startPercent: 83,
            endPercent: 85,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: 1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 32,
            startPercent: 86,
            endPercent: 87,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 0,
            index: 33,
            startPercent: 88,
            endPercent: 90,
            color: {
                hex: '#ff0000',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 34,
            startPercent: 91,
            endPercent: 91,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 60,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 35,
            startPercent: 92,
            endPercent: 92,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 36,
            startPercent: 93,
            endPercent: 95,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 0,
            index: 37,
            startPercent: 96,
            endPercent: 100,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        }
    ],
    [
        {
            range: 1,
            index: 0,
            startPercent: 0,
            endPercent: 4,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 1,
            startPercent: 5,
            endPercent: 10,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 2,
            startPercent: 11,
            endPercent: 13,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 3,
            startPercent: 14,
            endPercent: 15,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 4,
            startPercent: 16,
            endPercent: 20,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 5,
            startPercent: 21,
            endPercent: 25,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 6,
            startPercent: 26,
            endPercent: 27,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -0.8,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 7,
            startPercent: 28,
            endPercent: 30,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 8,
            startPercent: 31,
            endPercent: 34,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 9,
            startPercent: 35,
            endPercent: 37,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 10,
            startPercent: 38,
            endPercent: 40,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 11,
            startPercent: 41,
            endPercent: 41,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -45,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 12,
            startPercent: 42,
            endPercent: 42,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 13,
            startPercent: 43,
            endPercent: 45,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 14,
            startPercent: 46,
            endPercent: 47,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 15,
            startPercent: 48,
            endPercent: 50,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 16,
            startPercent: 51,
            endPercent: 54,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 17,
            startPercent: 55,
            endPercent: 55,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 18,
            startPercent: 56,
            endPercent: 57,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 19,
            startPercent: 58,
            endPercent: 60,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 20,
            startPercent: 61,
            endPercent: 61,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -30,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 21,
            startPercent: 62,
            endPercent: 62,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 22,
            startPercent: 63,
            endPercent: 65,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 23,
            startPercent: 66,
            endPercent: 66,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 24,
            startPercent: 67,
            endPercent: 67,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 25,
            startPercent: 68,
            endPercent: 70,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 26,
            startPercent: 71,
            endPercent: 71,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -50,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 27,
            startPercent: 72,
            endPercent: 72,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 28,
            startPercent: 73,
            endPercent: 76,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 29,
            startPercent: 77,
            endPercent: 80,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 30,
            startPercent: 81,
            endPercent: 82,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 31,
            startPercent: 83,
            endPercent: 85,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -1,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 32,
            startPercent: 86,
            endPercent: 87,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0.5
        },
        {
            range: 1,
            index: 33,
            startPercent: 88,
            endPercent: 90,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 34,
            startPercent: 91,
            endPercent: 91,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: -60,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 35,
            startPercent: 92,
            endPercent: 92,
            color: {
                hex: '#0c33f5',
                alphaPercent: 100
            },
            offsetX: 0,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 36,
            startPercent: 93,
            endPercent: 95,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: -0.8,
            offsetY: 0,
            blur: 0
        },
        {
            range: 1,
            index: 37,
            startPercent: 96,
            endPercent: 100,
            color: {
                hex: '#32cd32',
                alphaPercent: 100
            },
            offsetX: 3,
            offsetY: 0,
            blur: 0
        }
    ]
]

export default _defaultTextShadowRange;
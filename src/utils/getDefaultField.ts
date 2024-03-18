import G from "~/lib/glitch/types";

const defaultField: G.Field = {
    range: 0,
    index: 0,
    offsetFrame: 0,
    shadows: {
        [G.PropertyName.TextShadow]: {
            enabled: true,
            fillAllFrames: true,
            color: {
                hex: "#724cf9",
                alphaPercent: 100,
            },
            blur: 0,
            offsetX: 0,
            offsetY: 0,
        },
        [G.PropertyName.BoxShadow]: {
            enabled: false,
            fillAllFrames: true,
            color: {
                hex: "#724cf9",
                alphaPercent: 100,
            },
            blur: 0,
            offsetX: 0,
            offsetY: 0,
            spread: 0,
        },
    },
};

export default function getDefaultField(
    range: number,
    index: number,
    offset: number,
): G.Field {
    return {
        ...deepCopy(defaultField),
        range,
        index,
        offsetFrame: offset,
    };
}

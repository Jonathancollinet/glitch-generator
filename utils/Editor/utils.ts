import type { GlitchAnimationProperty, GlitchConfig, GlitchShadowField, GlitchShadowProperty } from "~/glitch/types";

export function removeRange(config: GlitchConfig, rangeIndex: number) {
    applyToUpperRanges(rangeIndex, config, (range, index) => {
        config.ranges[index] = range.map(field => {
            field.range -= 1;
            return field;
        });
    });

    config.ranges.splice(rangeIndex, 1);
}

export function duplicateRange(config: GlitchConfig, rangeIndex: number) {
    const rangeToCopy = deepCopy(config.ranges[rangeIndex]).map(field => {
        field.range += 1;

        return field;
    });

    applyToUpperRanges(rangeIndex, config, (range, index) => {
        config.ranges[index] = range.map(field => {
            field.range += 1;
            return field;
        });
    });

    config.ranges.splice(rangeIndex + 1, 0, rangeToCopy);

}

export function removeField(config: GlitchConfig, field: GlitchShadowField) {
    const range = config.ranges[field.range];
    const fieldNb = range.length;
    const index = field.index;

    if (index < (fieldNb - 1)) {
        const length = (fieldNb - 1) - index;

        for (let i = 1; i <= length; ++i) {
            range[index + i].index -= 1;
        }
    }

    if (index === 0 && fieldNb > 1) {
        range[1].offsetFrame = 0;
    }

    config.ranges[field.range].splice(field.index, 1);
}

export function pushField(range: GlitchShadowField[], rangeIndex: number) {
    const lastOffsetFrame = range[range.length - 1]?.offsetFrame;

    if (lastOffsetFrame === undefined) {
        range.push(getDefaultField(rangeIndex, range.length, 0));
    } else {
        const nextMidOffset = lastOffsetFrame < 100 ? Math.ceil((lastOffsetFrame + ((100 - lastOffsetFrame) / 2))) : 0;

        if (nextMidOffset) {
            range.push(getDefaultField(rangeIndex, range.length, nextMidOffset));
        }
    }
}

export function reverseRangeColors(range: GlitchShadowField[]) {
    applyToFieldProperties(range, (property) => {
        property.color.hex = reverseColor(property.color.hex);
    })
}

export function reverseRangePositions(range: GlitchShadowField[]) {
    applyToFieldProperties(range, (property) => {
        property.offsetX = reverseNumber(property.offsetX);
        property.offsetY = reverseNumber(property.offsetY);
    })
}

function applyToFieldProperties(range: GlitchShadowField[], callback: (property: GlitchShadowProperty) => void) {
    range.forEach((field) => {
        let key: GlitchAnimationProperty;

        for (key in field.properties) {
            const property = field.properties[key];

            if (property) {
                callback(property);
            }
        }
    });
}

function applyToUpperRanges(rangeIndex: number, config: GlitchConfig, callback: (range: GlitchShadowField[], index: number) => void) {
    const rangeNb = config.ranges.length;

    if (rangeIndex < (rangeNb - 1)) {
        const length = (rangeNb - 1) - rangeIndex;

        for (let i = 1; i <= length; ++i) {
            const nRangeIndex = rangeIndex + i;

            callback(config.ranges[nRangeIndex], nRangeIndex);
        }
    }
}
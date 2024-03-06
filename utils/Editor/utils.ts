import type { GlitchAnimationProperty, GlitchConfig, GlitchShadowField, GlitchShadowProperty } from "~/glitch/types";
import type { Preset } from "../Toobox/presets";

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

    if (fieldNb === 1) {
        config.ranges.splice(field.range, 1);

        return;
    }

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

export function addFieldAtOffset(range: GlitchShadowField[], rangeIndex: number, offset: number) {
    let closestIndex = range.findIndex((field) => field.offsetFrame > offset);

    closestIndex = closestIndex !== -1 ? closestIndex : range.length;

    const previousField = range[range.length === 1 ? 0 : closestIndex - 1];
    const previousParams = deepCopy(previousField);
    const newField = getDefaultField(rangeIndex, range.length === 1 ? 1 : closestIndex, offset);

    newField.properties = previousParams.properties;

    if (range.length === 1) {
        range.push(newField);
        return true;
    }

    if (previousField.offsetFrame !== offset) {
        range.splice(closestIndex, 0, newField);
        incrementUpperFieldIndexesFrom(range, closestIndex);

        return true;
    } else {
        const copy = deepCopy(range);

        copy.splice(closestIndex - 1, 0, newField);

        const length = copy.length;
        let i = closestIndex;
        let found = false;

        for (i; i < length; ++i) {
            const field = copy[i];
            const nextField = copy[i + 1];

            if ((nextField?.offsetFrame ?? 101) - field.offsetFrame > 1) {
                field.offsetFrame += 1;
                found = true;

                break;
            } else {
                field.offsetFrame += 1;
            }
        }

        if (found) {
            copy.forEach((field, index) => range[index] = copy[index]);
            incrementUpperFieldIndexesFrom(range, closestIndex);

            return true;
        }
    }

    return false;
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

export function setConfigFromPreset(config: GlitchConfig, preset: Preset) {
    config.text.bgColor = preset.config.text.bgColor;
    config.text.color = preset.config.text.color;
    config.text.size = preset.config.text.size;
    config.text.padding = preset.config.text.padding;
    config.text.height = preset.config.text.height;
    config.text.message = preset.config.text.message;
    config.animation.duration = preset.config.animation.duration;
    config.ranges = deepCopy(preset.config.ranges);
}

function incrementUpperFieldIndexesFrom(range: GlitchShadowField[], index: number) {
    const length = range.length;

    for (let i = index; i < length; ++i) {
        range[i].index = i;
    }
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

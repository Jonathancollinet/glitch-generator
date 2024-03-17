import G from "~/glitch/types";
import type { Preset } from "../Toobox/presets";

export function getFieldsToUpdate(ranges: G.Field[][], newField: G.Field) {
    const range = ranges[newField.range];
    const previousField = range[newField.index - 1];
    const nextField = range[newField.index + 1];
    const batch = [newField];

    if (previousField) {
        batch.splice(0, 0, previousField);
    }

    if (nextField) {
        batch.push(nextField);
    }

    return batch;
}

export function removeRange(ranges: G.Field[][], rangeIndex: number) {
    const copy = deepCopy(ranges);

    applyToUpperRanges(rangeIndex, copy, (range, index) => {
        copy[index] = range.map((field) => {
            field.range -= 1;
            return field;
        });
    });

    copy.splice(rangeIndex, 1);
    copyRanges(ranges, copy);
}

export function duplicateRange(ranges: G.Field[][], rangeIndex: number) {
    const copy = deepCopy(ranges);
    const rangeToCopy = deepCopy(copy[rangeIndex]).map((field) => {
        field.range += 1;

        return field;
    });

    applyToUpperRanges(rangeIndex, copy, (range, index) => {
        copy[index] = range.map((field) => {
            field.range += 1;
            return field;
        });
    });

    copy.splice(rangeIndex + 1, 0, rangeToCopy);
    copyRanges(ranges, copy);
}

export function removeField(ranges: G.Field[][], field: G.Field) {
    const copy = deepCopy(ranges);
    const range = copy[field.range];
    const fieldNb = range.length;
    const index = field.index;

    if (fieldNb === 1) {
        copy.splice(field.range, 1);

        return;
    }

    if (index < fieldNb - 1) {
        const length = fieldNb - 1 - index;

        for (let i = 1; i <= length; ++i) {
            range[index + i].index -= 1;
        }
    }

    if (index === 0 && fieldNb > 1) {
        range[1].offsetFrame = 0;
    }

    copy[field.range].splice(field.index, 1);
    copyRanges(ranges, copy);
}

export function addFieldAtOffset(
    ranges: G.Field[][],
    rangeIndex: number,
    offset: number,
) {
    const copy = deepCopy(ranges);
    const range = copy[rangeIndex];
    let nextIndex = range.findIndex((field) => field.offsetFrame > offset);

    nextIndex = nextIndex !== -1 ? nextIndex : range.length;

    const hoveredField = range[nextIndex - 1];
    const newField = getDefaultField(rangeIndex, nextIndex, offset);

    newField.properties = deepCopy(hoveredField.properties);

    if (hoveredField.offsetFrame !== offset) {
        range.splice(nextIndex, 0, newField);
        incrementUpperFieldIndexesFrom(range, nextIndex);
        copyRanges(ranges, copy);

        return nextIndex - 1;
    } else {
        newField.index = nextIndex - 1;
        range.splice(nextIndex - 1, 0, newField);

        const length = range.length;
        let i = nextIndex;
        let found = false;

        for (i; i < length; ++i) {
            const field = range[i];
            const nextField = range[i + 1];

            if ((nextField?.offsetFrame ?? 101) - field.offsetFrame > 1) {
                field.offsetFrame += 1;
                found = true;

                break;
            } else {
                field.offsetFrame += 1;
            }
        }

        if (found) {
            incrementUpperFieldIndexesFrom(range, nextIndex);
            copyRanges(ranges, copy);

            return nextIndex - 1;
        }
    }

    return -1;
}

export function reverseRangeColors(range: G.Field[]) {
    applyToFieldProperties(range, (property) => {
        property.color.hex = reverseColor(property.color.hex);
    });
}

export function reverseRangePositions(range: G.Field[]) {
    applyToFieldProperties(range, (property) => {
        property.offsetX = reverseNumber(property.offsetX);
        property.offsetY = reverseNumber(property.offsetY);
    });
}

export function setConfigFromPreset(config: G.Config, preset: Preset) {
    config.text.bgColor = deepCopy(preset.config.text.bgColor);
    config.text.color = deepCopy(preset.config.text.color);
    config.text.size = preset.config.text.size;
    config.text.padding = preset.config.text.padding;
    config.text.height = preset.config.text.height;
    config.text.borderRadius = preset.config.text.borderRadius;
    config.text.message = preset.config.text.message;
    config.animation.duration = preset.config.animation.duration;
    config.ranges = deepCopy(preset.config.ranges);
}

export function setAllColors(config: G.Config) {
    const textColor = config.text.color;
    const colors: { [key: string]: G.Color } = {
        [`${textColor.hex}-${textColor.alphaPercent}`]: textColor,
    };

    config.ranges.forEach((range) => {
        return range.forEach((field) => {
            return Object.keys(field.properties).forEach((key) => {
                const property = field.properties[key as G.PropertyName];

                if (property?.enabled && property.color) {
                    const key = `${property.color.hex}-${property.color.alphaPercent}`;

                    colors[key] = property.color;
                }
            });
        });
    });

    allColors.length = 0;
    Object.keys(colors).forEach((key) => {
        const color = colors[key];
        const rgba = hexToRGBObject(color.hex, color.alphaPercent);

        if (rgba) {
            const rgbaString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

            allColors.push(rgbaString);
        }
    });
    allColors.sort();
}

function copyRanges(ranges: G.Field[][], rangesToCopy: G.Field[][]) {
    rangesToCopy.forEach((range, index) => {
        ranges[index] = range;
    });
}

function incrementUpperFieldIndexesFrom(range: G.Field[], index: number) {
    const length = range.length;

    for (let i = index; i < length; ++i) {
        range[i].index = i;
    }
}

function applyToFieldProperties(
    range: G.Field[],
    callback: (property: G.Property) => void,
) {
    range.forEach((field) => {
        let key: G.PropertyName;

        for (key in field.properties) {
            const property = field.properties[key];

            if (property) {
                callback(property);
            }
        }
    });
}

function applyToUpperRanges(
    rangeIndex: number,
    ranges: G.Field[][],
    callback: (range: G.Field[], index: number) => void,
) {
    const rangeNb = ranges.length;

    if (rangeIndex < rangeNb - 1) {
        const length = rangeNb - 1 - rangeIndex;

        for (let i = 1; i <= length; ++i) {
            const nRangeIndex = rangeIndex + i;

            callback(ranges[nRangeIndex], nRangeIndex);
        }
    }
}

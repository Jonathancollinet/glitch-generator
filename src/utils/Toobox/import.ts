import { GlitchAnimationProperty, type GlitchBaseText, type GlitchShadowField, type GlitchShadowProperty } from "~/glitch/types";

export default function importKeyframes(presetName: string, textStyle: string, keyframe: string) {
    const result: {config: any, errors: {[key: string]: string}} = {
        config: null,
        errors: {}
    };

    if (!presetName) {
        result.errors.presetName = "errors.import.presetName";
    } else if (!keyframe) {
        result.errors.keyframes = "errors.import.keyframes";
    } else {
        let text: GlitchBaseText | undefined;

        result.config = getDefaultGlitchConfig();
        result.config.ranges = kfStringToRanges(keyframe);

        if (textStyle) {
            text = textStyleToText(textStyle);

            if (!text) {
                result.errors.textStyle = "errors.import.textStyle";

                return result;
            }
        }

        if (result.config.ranges) {
            fillMissingProperties(result.config.ranges);
            result.config.text = text || result.config.text;
        } else {
            result.errors.keyframes = "errors.import.keyframes";
        }
    }

    return result;
}

function fillMissingProperties(ranges: GlitchShadowField[][]) {
    ranges.forEach((range, rangeIndex) => {
        range.forEach((field, fieldIndex) => {
            const properties = [
                GlitchAnimationProperty.TextShadow,
                GlitchAnimationProperty.BoxShadow
            ];
            const newField = getDefaultField(0, 0, 0);

            newField.range = field.range;
            newField.index = field.index;
            newField.offsetFrame = field.offsetFrame;

            properties.forEach((property: GlitchAnimationProperty) => {
                
                if (field.properties[property]) {
                    newField.properties[property] = field.properties[property];
                } else {
                    (<GlitchShadowProperty>newField.properties[property]).enabled = false;
                }
            });

            ranges[rangeIndex][fieldIndex] = newField;
        });
    });
}
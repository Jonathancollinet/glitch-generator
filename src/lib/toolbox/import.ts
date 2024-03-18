import G from "~/lib/glitch/types";
import { allDeclarations } from "~/utils/constants";
import propertyValuesGetters from "~/lib/toolbox/declarationValues";

export default function importKeyframes(
    presetName: string,
    textStyle: string,
    keyframe: string,
) {
    const result: { config: any; errors: { [key: string]: string } } = {
        config: null,
        errors: {},
    };

    if (!presetName) {
        result.errors.presetName = "errors.import.presetName";
    } else if (!keyframe) {
        result.errors.keyframes = "errors.import.keyframes";
    } else {
        let text: G.BaseText | undefined;

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

function fillMissingProperties(ranges: G.Field[][]) {
    ranges.forEach((range, rangeIndex) => {
        range.forEach((field, fieldIndex) => {
            const shadows = [
                G.PropertyName.TextShadow,
                G.PropertyName.BoxShadow,
            ];
            const newField = getDefaultField(0, 0, 0);

            newField.range = field.range;
            newField.index = field.index;
            newField.offsetFrame = field.offsetFrame;

            shadows.forEach((property: G.PropertyName) => {
                if (field.shadows[property]) {
                    newField.shadows[property] = field.shadows[property];
                } else {
                    (newField.shadows[property] as G.Shadow).enabled = false;
                }
            });

            ranges[rangeIndex][fieldIndex] = newField;
        });
    });
}

function kfStringToRanges(keyframe: string) {
    const ranges: G.Field[][] = [];
    const styleSheet = getStyleSheet(keyframe);

    if (styleSheet?.cssRules?.length) {
        const rules = [].slice.call(styleSheet.cssRules) as CSSKeyframesRule[];
        const keyframesRule = rules.filter((rule) => {
            return rule.constructor.name === "CSSKeyframesRule";
        })[0];

        if (keyframesRule) {
            const keyframeRules = [].slice.call(
                keyframesRule.cssRules,
            ) as CSSKeyframeRule[];

            keyframeRules.forEach((rule) => {
                if (rule.constructor.name === "CSSKeyframeRule") {
                    const percents = rule.keyText
                        .trim()
                        .replace(/[%\s]*/gim, "")
                        .split(",");
                    const ruleDeclarations = getRuleDeclarationsFrom(rule);

                    percents.forEach((percent) => {
                        const offsetFrame = +percent;

                        ruleDeclarations.forEach((declarations) => {
                            declarations.values.length &&
                                setPropertyInRanges(
                                    ranges,
                                    declarations.propertyName as G.PropertyName,
                                    declarations.values,
                                    offsetFrame,
                                );
                        });
                    });
                }
            });

            prefixRangesOffsetZero(ranges);

            return ranges;
        }
    }
}

function getRuleDeclarationsFrom(rule: CSSKeyframeRule) {
    return allDeclarations.map((declaration: string) => ({
        propertyName: declaration,
        values:
            (
                rule.style[
                    toCamel(declaration) as keyof CSSStyleDeclaration
                ] as string
            )
                ?.replace(/px,/gim, "px;")
                .split("; ")
                .filter((v: string) => v) || [],
    }));
}

function prefixRangesOffsetZero(ranges: G.Field[][]) {
    ranges.forEach((range) => {
        range.sort((a, b) => a.offsetFrame - b.offsetFrame);

        if (range[0].offsetFrame !== 0) {
            range.unshift({
                range: range[0].range,
                index: 0,
                offsetFrame: 0,
                shadows: {},
            });
        }

        range.forEach((field, index) => {
            field.index = index;
        });
    });
}

function setPropertyInRanges(
    ranges: G.Field[][],
    propertyName: G.PropertyName,
    values: string[],
    offsetFrame: number,
) {
    values.forEach((value, rangeIndex) => {
        let range = ranges[rangeIndex];

        if (!range) {
            range = [];
            ranges[rangeIndex] = range;
        }

        let field = range.find((field) => field.offsetFrame === offsetFrame);

        if (!field) {
            field = {
                range: rangeIndex,
                index: range.length,
                offsetFrame,
                shadows: {},
            };
            range.push(field);
        }

        field.shadows[propertyName] = {
            enabled: true,
            fillAllFrames: false,
            ...propertyValuesGetters[propertyName](value),
        };
    });
}

function textStyleToText(style: string) {
    const text: G.BaseText = {
        size: 42,
        unit: "px",
        color: {
            hex: "#000000",
            alphaPercent: 100,
        },
        bgColor: {
            hex: "#000000",
            alphaPercent: 100,
        },
        height: 0,
        padding: 0,
        borderRadius: 0,
        message: "Text",
    };

    const styleSheet = getStyleSheet(style);
    const textCss = (styleSheet?.cssRules?.[0] as CSSStyleRule)?.style;

    if (textCss) {
        text.size = +textCss.fontSize.replace(/px/gim, "");
        text.color = getGlitchColorFrom(textCss.color);
        text.bgColor = getGlitchColorFrom(textCss.backgroundColor);
        text.height = +textCss.height.replace(/px/gim, "");
        text.padding = +textCss.padding.replace(/px/gim, "");
        text.borderRadius = +textCss.borderRadius.replace(/px/gim, "");

        return text;
    }
}

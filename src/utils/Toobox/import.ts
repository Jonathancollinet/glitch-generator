import G from "~/glitch/types";

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
            const properties = [
                G.PropertyName.TextShadow,
                G.PropertyName.BoxShadow,
            ];
            const newField = getDefaultField(0, 0, 0);

            newField.range = field.range;
            newField.index = field.index;
            newField.offsetFrame = field.offsetFrame;

            properties.forEach((property: G.PropertyName) => {
                if (field.properties[property]) {
                    newField.properties[property] = field.properties[property];
                } else {
                    (newField.properties[property] as G.Property).enabled =
                        false;
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
                    const textShadows =
                        rule.style.textShadow
                            ?.replace(/px,/gim, "px;")
                            .split("; ")
                            .filter((v) => v) || [];
                    const boxShadows =
                        rule.style.boxShadow
                            ?.replace(/px,/gim, "px;")
                            .split("; ")
                            .filter((v) => v) || [];

                    percents.forEach((percent) => {
                        const offsetFrame = +percent;

                        textShadows.length &&
                            setShadowInRanges(
                                ranges,
                                G.PropertyName.TextShadow,
                                textShadows,
                                offsetFrame,
                            );
                        boxShadows.length &&
                            setShadowInRanges(
                                ranges,
                                G.PropertyName.BoxShadow,
                                boxShadows,
                                offsetFrame,
                            );
                    });
                }
            });

            prefixRangesOffsetZero(ranges);

            return ranges;
        }
    }
}

function prefixRangesOffsetZero(ranges: G.Field[][]) {
    ranges.forEach((range) => {
        range.sort((a, b) => a.offsetFrame - b.offsetFrame);

        if (range[0].offsetFrame !== 0) {
            range.unshift({
                range: range[0].range,
                index: 0,
                offsetFrame: 0,
                properties: {},
            });
        }

        range.forEach((field, index) => {
            field.index = index;
        });
    });
}

function setShadowInRanges(
    ranges: G.Field[][],
    propertyName: G.PropertyName,
    shadows: string[],
    offsetFrame: number,
) {
    shadows.forEach((shadow, rangeIndex) => {
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
                properties: {},
            };
            range.push(field);
        }

        const color = getGlitchColorFrom(shadow);
        const shadowValues = getShadowProps(shadow, propertyName);
        const shadowProperty: G.Property = {
            enabled: true,
            fillAllFrames: false,
            color,
            ...shadowValues,
        };

        field.properties[propertyName] = shadowProperty;
    });
}

function getShadowProps(shadow: string, propertyName: G.PropertyName) {
    const shadowProps: Pick<
        G.Property,
        "offsetX" | "offsetY" | "blur" | "spread"
    > = {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
    };
    const shadowParse = shadow.match(/([-]?\d+px)/gim);

    if (shadowParse) {
        shadowProps.offsetX = +shadowParse[0].replace(/px/gim, "");
        shadowProps.offsetY = +shadowParse[1].replace(/px/gim, "");

        if (shadowParse.length === 3) {
            shadowProps.blur = +shadowParse[2].replace(/px/gim, "");
        }

        if (propertyName === G.PropertyName.BoxShadow) {
            if (shadowParse.length === 4) {
                shadowProps.spread = +shadowParse[3].replace(/px/gim, "");
            } else {
                shadowProps.spread = 0;
            }
        }
    }

    return shadowProps;
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

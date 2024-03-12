import { GlitchAnimationProperty, type GlitchColor, type GlitchShadowField, type GlitchShadowProperty } from "~/glitch/types";

export default function kfStringToRanges(keyframe: string) {
    const ranges: GlitchShadowField[][] = [];
    const styleSheet = getStyleSheet(keyframe);

    if (styleSheet?.cssRules?.length) {
        const rules = [].slice.call(styleSheet.cssRules) as CSSKeyframesRule[];
        const keyframesRule = rules.filter(rule => {
            return rule.constructor.name === "CSSKeyframesRule";
        })[0];

        if (keyframesRule) {
            const keyframeRules = [].slice.call(keyframesRule.cssRules) as CSSKeyframeRule[];

            keyframeRules.forEach(rule => {
                if (rule.constructor.name === "CSSKeyframeRule") {
                    const percents = rule.keyText.trim().replace(/[%\s]*/gmi, '').split(',');
                    const textShadows = rule.style.textShadow?.replace(/px,/gmi, 'px;').split('; ').filter(v => v) || [];
                    const boxShadows = rule.style.boxShadow?.replace(/px,/gmi, 'px;').split('; ').filter(v => v) || [];
  
                    percents.forEach(percent => {
                        const offsetFrame = +percent;

                        textShadows.length && setShadowInRanges(ranges, GlitchAnimationProperty.TextShadow, textShadows, offsetFrame);
                        boxShadows.length && setShadowInRanges(ranges, GlitchAnimationProperty.BoxShadow, boxShadows, offsetFrame);
                    });
                }
            });

            prefixRangesOffsetZero(ranges);

            return ranges;
        }
    }
}

function prefixRangesOffsetZero(ranges: GlitchShadowField[][]) {
    ranges.forEach(range => {
        range.sort((a, b) => a.offsetFrame - b.offsetFrame);
        
        if (range[0].offsetFrame !== 0) {
            range.unshift({
                range: range[0].range,
                index: 0,
                offsetFrame: 0,
                properties: {}
            });
        }

        range.forEach((field, index) => {
            field.index = index;
        });
    });
}

function setShadowInRanges(ranges: GlitchShadowField[][], propertyName: GlitchAnimationProperty, shadows: string[], offsetFrame: number) {
    shadows.forEach((shadow, rangeIndex) => {
        let range = ranges[rangeIndex];

        if (!range) {
            range = [];
            ranges[rangeIndex] = range;
        }

        let field = range.find(field => field.offsetFrame === offsetFrame);

        if (!field) {
            field = {
                range: rangeIndex,
                index: range.length,
                offsetFrame,
                properties: {}
            };
            range.push(field);
        }

        const color = getGlitchColorFrom(shadow);
        const shadowValues = getShadowProps(shadow, propertyName);
        const shadowProperty: GlitchShadowProperty = {
            enabled: true,
            fillAllFrames: false,
            color,
            ...shadowValues
        };

        field.properties[propertyName] = shadowProperty;
    });

}

function getShadowProps(shadow: string, propertyName: GlitchAnimationProperty) {
    const shadowProps: Pick<GlitchShadowProperty, 'offsetX' | 'offsetY' | 'blur' | 'spread'> = {
        offsetX: 0,
        offsetY: 0,
        blur: 0
    };
    const shadowParse = shadow.match(/([-]?\d+px)/gmi);

    if (shadowParse) {
        shadowProps.offsetX = +shadowParse[0].replace(/px/gmi, '');
        shadowProps.offsetY = +shadowParse[1].replace(/px/gmi, '');

        if (shadowParse.length === 3) {
            shadowProps.blur = +shadowParse[2].replace(/px/gmi, '');
        }

        if (propertyName === GlitchAnimationProperty.BoxShadow) {
            if (shadowParse.length === 4) {
                shadowProps.spread = +shadowParse[3].replace(/px/gmi, '');
            } else {
                shadowProps.spread = 0;
            }
        }
    }

    return shadowProps;
}
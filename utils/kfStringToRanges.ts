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
    }

    return ranges;
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

        const color = getColor(shadow);
        const shadowValues = getShadowProps(shadow);
        const shadowProperty: GlitchShadowProperty = {
            enabled: true,
            fillAllFrames: false,
            color,
            ...shadowValues
        };

        field.properties[propertyName] = shadowProperty;
    });

}

function getShadowProps(shadow: string) {
    const shadowProps: Pick<GlitchShadowProperty, 'offsetX' | 'offsetY' | 'blur' | 'spread'> = {
        offsetX: 0,
        offsetY: 0,
        blur: 0
    };
    const shadowParse = shadow.match(/([-]?\d+px)/gmi);

    if (shadowParse) {
        shadowProps.offsetX = +shadowParse[0].replace(/px/gmi, '');
        shadowProps.offsetY = +shadowParse[1].replace(/px/gmi, '');
        shadowProps.blur = +shadowParse[2].replace(/px/gmi, '');

        if (shadowParse.length === 4) {
            shadowProps.spread = +shadowParse[3].replace(/px/gmi, '');
        }
    }

    return shadowProps;
}

function getColor(shadow: string) {
    const fieldColor: GlitchColor = {
        hex: '',
        alphaPercent: 100
    };
    const colorParse = shadow.match(/rgb[a]?\((.*)\)/)?.[1]?.split(', ');

    if (colorParse) {
        fieldColor.hex = RGBToHex(+colorParse[0], +colorParse[1], +colorParse[2]);

        if (colorParse.length === 4) {
            fieldColor.alphaPercent = +colorParse[3] * 100;
        }

    }

    return fieldColor;
}


function getStyleSheet(keyframe: string) {
    const style = document.createElement('style');
    let sheet: CSSStyleSheet | null = null;

    style.textContent = keyframe;
    document.head.appendChild(style);
    sheet = style.sheet;
    style.remove();

    return sheet;
}
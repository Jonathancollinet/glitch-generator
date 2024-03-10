import type { GlitchBaseText } from "~/glitch/types";

export default function textStyleToText(style: string) {
    const text: GlitchBaseText = {
        size: 42,
        unit: "px",
        color: {
            hex: "#000000",
            alphaPercent: 100
        },
        bgColor: {
            hex: "#000000",
            alphaPercent: 100
        },
        height: 0,
        padding: 0,
        borderRadius: 0,
        message: "Text"
    };

    const styleSheet = getStyleSheet(style);
    const textCss = (styleSheet?.cssRules?.[0] as CSSStyleRule)?.style;

    if (textCss) {
        text.size = +textCss.fontSize.replace(/px/gmi, '');
        text.color = getColorInStr(textCss.color);
        text.bgColor = getColorInStr(textCss.backgroundColor);
        text.height = +textCss.height.replace(/px/gmi, '');
        text.padding = +textCss.padding.replace(/px/gmi, '');
        text.borderRadius = +textCss.borderRadius.replace(/px/gmi, '');

        return text;
    }
}
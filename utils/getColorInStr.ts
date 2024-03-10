import type { GlitchColor } from "~/glitch/types";

export default function getColorInStr(shadow: string) {
    const fieldColor: GlitchColor = {
        hex: '#000000',
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
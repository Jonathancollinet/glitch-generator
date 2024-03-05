import { GlitchUnit } from "~/glitch/types";
import homepageRanges from "./homepage.ranges";

export default deepCopy({
    text: {
        size: 42,
        unit: GlitchUnit.Pixel,
        height: 0,
        padding: 0,
        bgColor: {
            hex: '#ffffff',
            alphaPercent: 0
        },
        color: {
            hex: '#000000',
            alphaPercent: 100
        },
        message: 'Animate me!'
    },
    animation: {
        duration: 3000
    },
    ranges: homepageRanges
})
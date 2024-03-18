import G from "~/lib/glitch/types";

const defaultGlitchConfig: G.Config = {
    controls: true,
    text: {
        size: 42,
        unit: G.Unit.Pixel,
        height: 0,
        padding: 0,
        borderRadius: 0,
        bgColor: {
            hex: "#ffffff",
            alphaPercent: 0,
        },
        color: {
            hex: "#000000",
            alphaPercent: 100,
        },
        message: "Animate me!",
    },
    animation: {
        duration: 3000,
    },
    ranges: [[getDefaultField(0, 0, 0)]],
};

export default function getDefaultGlitchConfig() {
    return deepCopy(defaultGlitchConfig);
}

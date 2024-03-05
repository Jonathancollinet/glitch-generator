import type { GlitchConfig } from "~/glitch/types"
import homepageConfigPreset from "./presets/homepage";

export type Preset = {
    name: string,
    config: Pick<GlitchConfig, "text" | "animation" | "ranges">
}

const presets: Preset[] = [
    {
        name: "Empty Glitch",
        config: getDefaultGlitchConfig()
    },
    {
        name: "Homepage Glitch",
        config: homepageConfigPreset
    },
]

export function getPresets() {
    return presets;
}
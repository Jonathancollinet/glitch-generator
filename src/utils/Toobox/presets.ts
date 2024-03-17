import G from "~/glitch/types";
import homepageConfigPreset from "./presets/homepage";
import { v4 as uuidv4 } from "uuid";
import { compress, decompress } from "lz-string";
import flashExemple from "./presets/flashExemple";
import neons from "./presets/neons";

export type PresetConfig = Pick<G.Config, "text" | "animation" | "ranges">;

export type Preset = {
    id: string;
    builtIn?: boolean;
    name: string;
    config: PresetConfig;
};

const presets: Preset[] = [
    {
        id: "empty_glitch",
        builtIn: true,
        name: "* Empty Glitch",
        config: getDefaultGlitchConfig(),
    },
    {
        id: "flash_glitch",
        builtIn: true,
        name: "* Thunder",
        config: flashExemple,
    },
    {
        id: "homepage_glitch",
        builtIn: true,
        name: "* Nucliweb",
        config: homepageConfigPreset,
    },
    {
        id: "neon_glitch",
        builtIn: true,
        name: "* Neon",
        config: neons,
    },
];

export function saveLastSelectedPreset(id: string) {
    localStorage.setItem("glitch_last_selected_preset", id);
}

export function getLastSelectedPreset() {
    const id = localStorage.getItem("glitch_last_selected_preset");
    const preset = getPresets().find((p) => p.id === id);

    if (!preset) {
        const firstPreset = presets[0];

        saveLastSelectedPreset(firstPreset.id);

        return firstPreset;
    }

    return preset;
}

export function addPreset(name: string, config: PresetConfig) {
    const preset: Preset = {
        id: uuidv4(),
        name,
        config,
    };

    if (isClient()) {
        savePreset(preset);
    }

    return deepCopy(preset);
}

export function updatePreset(preset: Preset) {
    if (isClient()) {
        savePreset(preset);
    }
}

export function removePreset(id: string) {
    if (isClient()) {
        localStorage.removeItem(`glitch_preset_${id}`);
    }
}

export function getPresets() {
    if (isClient()) {
        return deepCopy(presets.concat(getPresetsFromLocalStorage()));
    }

    return deepCopy(presets);
}

function savePreset(preset: Preset) {
    localStorage.setItem(
        `glitch_preset_${preset.id}`,
        compress(JSON.stringify(preset)),
    );
}

function getPresetsFromLocalStorage() {
    const presets = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key?.startsWith("glitch_preset_")) {
            const preset = localStorage.getItem(key);

            if (preset) {
                presets.push(JSON.parse(decompress(preset)));
            }
        }
    }

    return presets;
}

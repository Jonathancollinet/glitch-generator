import type { GlitchConfig } from "~/glitch/types"
import homepageConfigPreset from "./presets/homepage";
import { v4 as uuidv4 } from 'uuid';
import { compress, decompress } from 'lz-string';
import basicExemple from "./presets/basicExemple";
import flashExemple from "./presets/flashExemple";

export type PresetConfig = Pick<GlitchConfig, "text" | "animation" | "ranges">;

export type Preset = {
    id: string,
    name: string,
    config: PresetConfig
}

const presets: Preset[] = [
    {
        id: "basic_glitch",
        name: "* Basic Glitch",
        config: basicExemple
    },
    {
        id: "flash_glitch",
        name: "* Flash Glitch",
        config: flashExemple
    },
    {
        id: "homepage_glitch",
        name: "* Homepage Glitch",
        config: homepageConfigPreset
    },
    {
        id: "empty_glitch",
        name: "* Empty Glitch",
        config: getDefaultGlitchConfig()
    },
]

export function saveLastSelectedPreset(id: string) {
    localStorage.setItem("glitch_last_selected_preset", id);
}

export function getLastSelectedPreset() {
    const id = localStorage.getItem("glitch_last_selected_preset");
    const preset = getPresets().find(p => p.id === id);

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
        config
    };

    if (process.client) {
        savePresetToLocalStorage(preset);
    }

    return deepCopy(preset);
}

export function updatePreset(preset: Preset) {
    if (process.client) {
        savePresetToLocalStorage(preset);
    }

}

export function removePreset(id: string) {
    if (process.client) {
        localStorage.removeItem(`glitch_preset_${id}`);
    }
}

export function getPresets() {
    if (process.client) {
        return deepCopy(presets.concat(getPresetsFromLocalStorage()));
    }

    return deepCopy(presets);
}

export function isCustomPresetId(id: string) {
    return !presets.some(p => p.id === id);
}

function savePresetToLocalStorage(preset: Preset) {
    localStorage.setItem(`glitch_preset_${preset.id}`, compress(JSON.stringify(preset)));
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
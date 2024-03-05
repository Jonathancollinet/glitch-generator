<script setup lang="ts">

import type { GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
import Glitch from '~/glitch';
import { EditorDisplayedText } from '#components';
import * as EditorUtils from '~/utils/Editor/utils';
import { getPresets, type Preset } from '~/utils/Toobox/presets';

interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null
}

const errors = ref<Partial<GlitchErrors>>({});
const bindings = ref<GlitchBindings>({
    message: '',
    textStyle: {
        fontSize: "",
        padding: "",
        height: "",
        backgroundColor: "",
        color: ""
    }
});
const displayedText = ref<EditorDisplayedTextData>();
const glitchedEl = ref<HTMLElement | null>(null);
const currentPercent = ref(0);
const selectedField = ref<GlitchShadowField>();
const presets = ref<Preset[]>(getPresets());
const currentPreset = ref<Preset>(presets.value[0]);
const gconfig = reactive<GlitchConfig>(getDefaultGlitchConfig());

setConfigFromPreset(currentPreset.value);

const onRangesEvents = {
    selectField,
    addEmptyRange,
    duplicateRange,
    reversePositions,
    reverseColors,
    addField,
    removeRange,
    insertField
}

const onToolboxEvents = {
    updateField,
    removeField,
    closeField,
    presetChanged
}

let animationDuration = gconfig.animation.duration;
let glitch = new Glitch(gconfig);

gconfig.preventRangesCompute = true

gconfig.onValidated = (errs: GlitchErrors | undefined) => {
    if (errs) {
        errors.value = errs;
    } else {
        errors.value = {};
    }
}

function initConfig() {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
        computeConfig(gconfig, true);
        selectField(gconfig.ranges[0][0]);
    }
}

function bindGlitch(newBindings: any) {
    if (newBindings) {
        bindings.value = newBindings;
    }
}

function computeConfig(gconfig: GlitchConfig, forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        glitch.computeConfig(gconfig, forceRangeCompute)
            .then(bindGlitch)
            .catch((err: Error) => {
                console.error(err);
            });
    }
}

function exportKeyframe() {
    console.log(glitch?.exportKeyframes());
}

function updateField(newField: GlitchShadowField) {
    if (gconfig.ranges[newField.range]) {
        const range = gconfig.ranges[newField.range];
        const previousField = range[newField.index - 1];
        const batch = [newField];
        const nextField = range[newField.index + 1];

        if (previousField) {
            batch.splice(0, 0, previousField);
        }
        if (nextField) {
            batch.push(nextField);
        }

        glitch?.computeFields(batch);
    }
}

function addEmptyRange() {
    gconfig.ranges.push([getDefaultField(gconfig.ranges.length, 0, 0)]);
    computeConfig(gconfig, true);
}

function duplicateRange(rangeIndex: number) {
    const rangeNb = gconfig.ranges.length;

    closeField();

    if (rangeNb) {
        EditorUtils.duplicateRange(gconfig, rangeIndex);
        computeConfig(gconfig, true);
    }
}

function reversePositions(index: number) {
    const range = gconfig.ranges[index];

    if (range) {
        EditorUtils.reverseRangePositions(range);
        computeConfig(gconfig, true);
    }
}

function reverseColors(rangeIndex: number) {
    const range = gconfig.ranges[rangeIndex];

    if (range) {
        EditorUtils.reverseRangeColors(range);
        computeConfig(gconfig, true);
    }
}

function addField(rangeIndex: number) {
    const range = gconfig.ranges[rangeIndex];

    EditorUtils.pushField(range, rangeIndex);
    computeConfig(gconfig, true);
}

function removeField(field: GlitchShadowField) {
    closeField();
    EditorUtils.removeField(gconfig, field);
    computeConfig(gconfig, true);
}

function removeRange(rangeIndex: number) {
    closeField();
    EditorUtils.removeRange(gconfig, rangeIndex);
    computeConfig(gconfig, true);
}

function selectField(newField: GlitchShadowField) {
    selectedField.value = newField;
}

function closeField() {
    selectedField.value = undefined;
}

function setConfigFromPreset(preset: Preset) {
    gconfig.text.bgColor = preset.config.text.bgColor;
    gconfig.text.color = preset.config.text.color;
    gconfig.text.size = preset.config.text.size;
    gconfig.text.padding = preset.config.text.padding;
    gconfig.text.height = preset.config.text.height;
    gconfig.text.message = preset.config.text.message;
    gconfig.animation.duration = preset.config.animation.duration;
    gconfig.ranges = deepCopy(preset.config.ranges);
}

function presetChanged(preset: Preset) {
    setConfigFromPreset(preset);
    nextTick(() => {
        initConfig();
    })
}

function insertField(rangeIndex: number, offset: number) {
    const range = gconfig.ranges[rangeIndex];

    if (EditorUtils.addFieldAtOffset(range, rangeIndex, offset)) {
        computeConfig(gconfig, true)
    } else {
        alert("Can't add a field at the offset: " + offset);
    }
}

watch(currentPreset, (preset) => {
    if (preset) {
        presetChanged(preset);
    }
});

watch(gconfig.text, () => {
    computeConfig(gconfig)
});

watch(gconfig.animation, () => {
    const configDuration = gconfig.animation.duration;

    if (glitch.hasAnimationBrowserCompatibility() && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);
    } else {
        computeConfig(gconfig)
    }
});

onMounted(() => {
    initConfig();
});

onBeforeUnmount(() => {
    if (glitch) {
        glitch.destroy();
    }
});
</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <UiHeading>{{ $t('pages.editor.title') }}</UiHeading>
            <div class="flex items-center">
                <UiFormGroup label="pages.editor.presets.title">
                    <select v-model="currentPreset" class="w-full">
                        <option v-for="(preset, index) in presets" :key="index" :value="preset">{{ preset.name }}
                        </option>
                    </select>
                </UiFormGroup>
                <UiButton class="ml-4" @click="exportKeyframe">Get Keyframes</UiButton>
            </div>
        </div>
        <div class="lg:flex" :key="currentPreset.name">
            <div class="lg:w-[70%]">
                <EditorDisplayedText ref="displayedText" v-model="currentPercent" :bindings="bindings" :config="gconfig"
                    :controller="glitch.controller" />
                <EditorToolboxRanges :config="gconfig" :currentPercent="currentPercent" :selectedField="selectedField"
                    v-on="onRangesEvents" />
            </div>
            <EditorToolbox class="lg:w-[30%] lg:ml-8" v-model:config="gconfig" v-model:field="selectedField"
                :currentPercent="currentPercent" :errors="errors" v-on="onToolboxEvents" />
        </div>
    </div>
</template>

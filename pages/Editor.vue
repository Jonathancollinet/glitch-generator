<script setup lang="ts">
import type {
    GlitchBindings,
    GlitchConfig,
    GlitchErrors,
    GlitchShadowField
} from '~/glitch/types';
import {
    EditorDisplayedText,
    EditorPresets
} from '#components';
import {
    type Preset,
} from '~/utils/Toobox/presets';
import Glitch from '~/glitch';
import * as EditorUtils from '~/utils/Editor/utils';

interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null
}

interface EditorPresetsData extends Ref<InstanceType<typeof EditorPresets>> {
    savePreset: () => void
}

const errors = ref<Partial<GlitchErrors>>({});
const displayedText = ref<EditorDisplayedTextData>();
const glitchedEl = ref<HTMLElement | null>(null);
const presets = ref<EditorPresetsData>();
const currentPercent = ref(0);
const selectedField = ref<GlitchShadowField>();
const currentPreset = ref<Preset>();
const gconfig = reactive<GlitchConfig>(getDefaultGlitchConfig());
const bindings = ref<GlitchBindings>({
    message: '',
    textStyle: {
        fontSize: "",
        padding: "",
        borderRadius: "",
        height: "",
        backgroundColor: "",
        color: ""
    }
});

const onRangesEvents = {
    updateField,
    selectField,
    addEmptyRange,
    duplicateRange,
    reversePositions,
    reverseColors,
    removeRange,
    insertField
}

const onToolboxEvents = {
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

// -----------------------------------------------------------------

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

function selectFirstRangeField(range?: GlitchShadowField[]) {
    const firstFieldRange = (range || gconfig.ranges[0])?.[0];

    if (firstFieldRange) {
        selectField(firstFieldRange);
    }
}

async function computeConfig(gconfig: GlitchConfig, forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        const bindings = await glitch.computeConfig(gconfig, forceRangeCompute);

        bindGlitch(bindings);
        EditorUtils.setAllColors(gconfig);

        nextTick(() => {
            if (isCustomPreset.value) {
                presets.value?.savePreset();
            }
        });
    }
}

function updateField(newField: GlitchShadowField) {
    if (gconfig.ranges[newField.range]) {
        const range = gconfig.ranges[newField.range];
        const previousField = range[newField.index - 1];
        const nextField = range[newField.index + 1];
        const batch = [newField];

        if (previousField) {
            batch.splice(0, 0, previousField);
        }

        if (nextField) {
            batch.push(nextField);
        }

        glitch?.computeFields(batch);
        EditorUtils.setAllColors(gconfig);

        if (isCustomPreset.value) {
            presets.value?.savePreset();
        }
    }
}

function addEmptyRange() {
    gconfig.ranges.push([getDefaultField(gconfig.ranges.length, 0, 0)]);

    if (!selectedField.value) {
        selectField(gconfig.ranges[0][0]);
    }

    computeConfig(gconfig, true);
}

function duplicateRange(rangeIndex: number) {
    const rangeNb = gconfig.ranges.length;

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

function removeField(field: GlitchShadowField) {
    if (field.index === selectedField.value?.index && field.range === selectedField.value?.range) {
        closeField();
    }

    EditorUtils.removeField(gconfig, field);
    selectFirstRangeField(gconfig.ranges[field.range]);
    computeConfig(gconfig, true);
}

function removeRange(rangeIndex: number) {
    if (rangeIndex === selectedField.value?.range) {
        closeField();
    }

    EditorUtils.removeRange(gconfig, rangeIndex);
    computeConfig(gconfig, true);

    nextTick(() => {
        selectFirstRangeField();
    })
}

function selectField(newField: GlitchShadowField) {
    selectedField.value = newField;
}

function closeField() {
    selectedField.value = undefined;
}

function insertField(rangeIndex: number, offset: number) {
    const range = gconfig.ranges[rangeIndex];

    if (EditorUtils.addFieldAtOffset(range, rangeIndex, offset)) {
        computeConfig(gconfig, true)
    }
}

function presetChanged(preset: Preset) {
    currentPreset.value = preset;
    EditorUtils.setConfigFromPreset(gconfig, preset);

    nextTick(() => {
        computeConfig(gconfig, true);
        selectField(gconfig.ranges[0][0]);
    })
}

const isCustomPreset = computed(() => {
    const preset = currentPreset.value;

    return preset && !preset.builtIn;
});

watch(gconfig.text, () => {
    computeConfig(gconfig)
});

watch(gconfig.animation, () => {
    const configDuration = gconfig.animation.duration;

    if (configDuration !== animationDuration) {
        if (glitch.hasAnimationBrowserCompatibility()) {
            animationDuration = configDuration;
            glitch.replaceAnimationDuration(gconfig);

            nextTick(() => {
                if (isCustomPreset.value) {
                    presets.value?.savePreset();
                }
            })
        } else {
            computeConfig(gconfig)
        }
    }
});

onMounted(() => {
    initConfig();
});

onBeforeUnmount(() => {
    glitch.destroy();
});
</script>

<template>
    <div>
        <div class="flex items-center justify-between flex-col mb-4 md:flex-row" data-v-step="0,24">
            <div class="flex items-center md:m-0 lg:w-[75%] lg:mr-4">
                <UiHeading class="m-0">{{ $t('pages.editor.title') }}</UiHeading>
                <EditorTour />
            </div>
            <div class="flex items-center justify-between lg:w-[25%] lg:ml-4">
                <ClientOnly>
                    <EditorPresets ref="presets" :glitch="glitch" :config="gconfig" @presetChange="presetChanged" />
                </ClientOnly>
                <EditorActions :config="gconfig" :glitch="glitch" />
            </div>
        </div>
        <div class="lg:flex">
            <div class="lg:w-[75%] lg:mr-4 space-x-1">
                <EditorDisplayedText data-v-step="1" ref="displayedText" v-model="currentPercent" :bindings="bindings"
                    :config="gconfig" :controller="glitch.controller" />
                <EditorToolboxRanges data-v-step="5,16" :config="gconfig" :currentPercent="currentPercent"
                    :selectedField="selectedField" v-on="onRangesEvents" />
            </div>
            <EditorToolbox :key="currentPreset?.id" class="lg:w-[25%] lg:ml-4" v-model:config="gconfig" v-model:field="selectedField"
                :currentPercent="currentPercent" :errors="errors" v-on="onToolboxEvents" />
        </div>
    </div>
</template>

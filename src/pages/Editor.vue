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
import { isTourDone, redirectHelp, setTourDone } from '~/utils/Editor/tour';

useSeoMeta({
    title: 'Glitch Generator - Editor',
    ogTitle: 'Glitch Generator - Editor',
    description: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogDescription: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogImage: ''
});

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

const { welcomeModal } = useModalWelcome(setTourDone, redirectHelp);

const onRangesEvents = {
    updateField,
    selectField,
    addEmptyRange,
    duplicateRange,
    reversePositions,
    reverseColors,
    removeRange,
    insertField
};

const onToolboxEvents = {
    removeField,
    closeField,
    presetChanged
};

let animationDuration = gconfig.animation.duration;
let glitch = new Glitch(gconfig);

gconfig.preventRangesCompute = true;

gconfig.onValidated = (errs: GlitchErrors | undefined) => {
    if (errs) {
        errors.value = errs;
        verifySensibleData();
    } else {
        errors.value = {};
    }
};

// -----------------------------------------------------------------

async function initConfig() {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
        computeConfig(gconfig, true);
        selectField(gconfig.ranges[0][0]);
    }
}

function verifySensibleData() {
    if (errors.value['animation.duration']) {
        glitch.controller?.pause();
    } else {
        glitch.controller?.play();
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

function computeConfig(gconfig: GlitchConfig, forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        const bindings = glitch.computeConfig(gconfig, forceRangeCompute);

        bindGlitch(bindings);
        EditorUtils.setAllColors(gconfig);
        savePreset();
    }
}

function updateField(newField: GlitchShadowField) {
    if (gconfig.ranges[newField.range]) {
        glitch?.computeFields(EditorUtils.getFieldsToUpdate(gconfig.ranges, newField));
        EditorUtils.setAllColors(gconfig);
        savePreset();
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
        EditorUtils.duplicateRange(gconfig.ranges, rangeIndex);
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

    EditorUtils.removeField(gconfig.ranges, field);
    computeConfig(gconfig, true);

    nextTick(() => {
        selectFirstRangeField(gconfig.ranges[field.range]);
    });
}

function removeRange(rangeIndex: number) {
    if (rangeIndex === selectedField.value?.range) {
        closeField();
    }

    EditorUtils.removeRange(gconfig.ranges, rangeIndex);
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
        initConfig();
    })
}

function savePreset() {
    if (isCustomPreset.value) {
        presets.value?.savePreset();
    }
}

const isCustomPreset = computed(() => {
    const preset = currentPreset.value;

    return preset && !preset.builtIn;
});

const hasValidDuration = computed(() => {
    return errors.value['animation.duration'] === undefined;
});

watch(gconfig.text, () => {
    computeConfig(gconfig);
});

watch(gconfig.animation, () => {
    const configDuration = gconfig.animation.duration;

    if (configDuration !== animationDuration) {
        if (glitch.hasAnimationBrowserCompatibility()) {
            animationDuration = configDuration;
            glitch.replaceAnimationDuration(gconfig);

            nextTick(() => {
                savePreset();
            })
        } else {
            computeConfig(gconfig)
        }
    }
});

onMounted(() => {
    if (!isTourDone()) {
        welcomeModal.open();
    }

    initConfig();
});

onBeforeUnmount(() => {
    glitch.destroy();
});
</script>

<template>
    <div>
        <div class="md:flex space-y-4 md:space-y-0">
            <div class="md:w-[70%] lg:w-[75%] md:mr-4 space-x-1">
                <EditorDisplayedText ref="displayedText" v-model="currentPercent" :bindings="bindings" :config="gconfig"
                    :controller="glitch.controller" :hasValidDuration="hasValidDuration" />
                <EditorToolboxRanges :key="currentPreset?.id" :config="gconfig" :currentPercent="currentPercent"
                    :selectedField="selectedField" v-on="onRangesEvents" />
            </div>
            <div class="md:w-[30%] lg:w-[25%] md:ml-4">
                <div class="flex items-center justify-between mb-4">
                    <ClientOnly>
                        <EditorPresets ref="presets" :glitch="glitch" :config="gconfig" @presetChange="presetChanged" />
                    </ClientOnly>
                    <div class="flex">
                        <EditorActions :config="gconfig" :glitch="glitch" />
                    </div>
                </div>
                <EditorToolbox :key="currentPreset?.id" v-model:config="gconfig" v-model:field="selectedField"
                    :currentPercent="currentPercent" :errors="errors" v-on="onToolboxEvents" />
            </div>
        </div>
    </div>
</template>
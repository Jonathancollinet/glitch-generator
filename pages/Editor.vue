<script setup lang="ts">

import type { GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
import { Icons } from '~/types/enums';
import Glitch from '~/glitch';
import { EditorDisplayedText } from '#components';
import * as EditorUtils from '~/utils/Editor/utils';
import { saveLastSelectedPreset, getPresets, isCustomPresetId, addPreset, updatePreset, removePreset, type Preset, type PresetConfig, getLastSelectedPreset } from '~/utils/Toobox/presets';
import { isTourDone, setTourDone, tourSteps } from '~/utils/Editor/tour';
import { useModal } from 'vue-final-modal';
import AddPreset from '~/components/Ui/Modal/AddPreset.vue';
import DeletePreset from '~/components/Ui/Modal/DeletePreset.vue';
import Export from '~/components/Ui/Modal/Export.vue';

interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null
}

const tours: any = inject('tours')

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

const isCustomPreset = computed(() => {
    return isCustomPresetId(currentPreset.value.id);
});

EditorUtils.setConfigFromPreset(gconfig, currentPreset.value);

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

const tourCallbacks = {
    onFinish: setTourDone,
    onSkip: setTourDone,
    onStop: setTourDone,
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


const addPresetModal = useModal({
    component: AddPreset,
    attrs: {
        onConfirm(name: string) {
            if (name) {
                createPreset(name);
                addPresetModal.close();
            }
        },
        onCancel() {
            addPresetModal.close();
        }
    }
});

const deletePresetModal = useModal({
    component: DeletePreset,
    attrs: {
        onConfirm() {
            deletePreset();
            deletePresetModal.close();
        },
        onCancel() {
            addPresetModal.close();
        }
    }
});

const exportModal = useModal({
    component: Export,
    attrs: {
        glitch,
        onCancel() {
            exportModal.close();
        }
    }
});

function initConfig() {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
        computeConfig(gconfig, true);
        selectField(gconfig.ranges[0][0]);
    }
}

function initTour() {
    tours['tutorial']?.start();
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
        if (isCustomPreset.value) {
            savePreset();
        }

        glitch.computeConfig(gconfig, forceRangeCompute)
            .then(bindGlitch)
            .catch((err: Error) => {
                console.error(err);
            });
    }
}

function createPreset(name: string) {
    const preset = addPreset(name, gconfig);

    presets.value = getPresets();
    currentPreset.value = preset;
    EditorUtils.setConfigFromPreset(gconfig, currentPreset.value);
}

function savePreset() {
    currentPreset.value.config = deepCopy({
        text: gconfig.text,
        animation: gconfig.animation,
        ranges: gconfig.ranges
    });
    updatePreset(currentPreset.value);
    presets.value = getPresets();
}

function deletePreset() {
    removePreset(currentPreset.value.id);
    presets.value = getPresets();
    currentPreset.value = presets.value[presets.value.length - 1];
    EditorUtils.setConfigFromPreset(gconfig, currentPreset.value);
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

        if (isCustomPreset.value) {
            savePreset();
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

function addField(rangeIndex: number) {
    const range = gconfig.ranges[rangeIndex];

    EditorUtils.pushField(range, rangeIndex);
    computeConfig(gconfig, true);
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

function presetChanged(preset: Preset) {
    EditorUtils.setConfigFromPreset(gconfig, preset);

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

watch(() => currentPreset.value.id, () => {
    saveLastSelectedPreset(currentPreset.value.id);
    presetChanged(currentPreset.value);
});

watch(gconfig.text, () => {
    computeConfig(gconfig)
});

watch(gconfig.animation, () => {
    const configDuration = gconfig.animation.duration;

    if (glitch.hasAnimationBrowserCompatibility() && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);

        if (isCustomPreset.value) {
            savePreset();
        }
    } else {
        computeConfig(gconfig)
    }
});

const mounted = ref(false);

onMounted(() => {
    initConfig();
    currentPreset.value = getLastSelectedPreset();
    mounted.value = true;
    nextTick(() => {
        if (process.client) {
            if (!isTourDone()) {
                initTour();
            }
        }
    });
});

onBeforeUnmount(() => {
    if (glitch) {
        glitch.destroy();
    }
});
</script>

<template>
    <div>
        <div class="flex items-center justify-between flex-col mb-4 md:flex-row" data-v-step="0,24">
            <UiHeading class="flex items-center md:m-0 lg:w-[75%] lg:mr-4">
                <span>{{ $t('pages.editor.title') }}</span>
                <UiButton class="ml-4" variant="icon" size="icon" @click="initTour">
                    <UiIcon :icon="Icons.Help" @click="initTour" />
                </UiButton>
            </UiHeading>
            <div class="flex items-center justify-between lg:w-[25%] lg:ml-4">
                <ClientOnly>
                    <UiFormGroup class="mb-0">
                        <UiSelect :title="$t('pages.editor.selectPreset')" class="max-w-[150px]" data-v-step="22"
                            :options="presets" v-model="currentPreset" labelKey="name" />
                    </UiFormGroup>
                </ClientOnly>
                <div class="flex ml-4 *:ml-2">
                    <UiButton :title="$t('pages.editor.savePreset')" data-v-step="21" variant="icon" size="icon"
                        @click="addPresetModal.open">
                        <UiIcon :icon="Icons.Add" />
                    </UiButton>
                    <UiButton :title="$t('pages.editor.removePreset')" v-if="isCustomPreset" variant="icon" size="icon"
                        @click="deletePresetModal.open">
                        <UiIcon :icon="Icons.Trash" />
                    </UiButton>
                    <UiButton :title="$t('pages.editor.export')" data-v-step="23" variant="icon" size="icon"
                        @click="exportModal.open">
                        <UiIcon :icon="Icons.Download" />
                    </UiButton>
                </div>
            </div>
        </div>
        <div class="lg:flex" :key="currentPreset.id">
            <div class="lg:w-[75%] lg:mr-4">
                <EditorDisplayedText data-v-step="1" ref="displayedText" v-model="currentPercent" :bindings="bindings"
                    :config="gconfig" :controller="glitch.controller" />
                <EditorToolboxRanges data-v-step="5,16" :config="gconfig" :currentPercent="currentPercent"
                    :selectedField="selectedField" v-on="onRangesEvents" />
            </div>
            <EditorToolbox class="lg:w-[25%] lg:ml-4" v-model:config="gconfig" v-model:field="selectedField"
                :currentPercent="currentPercent" :errors="errors" v-on="onToolboxEvents" />
        </div>
        <template v-if="mounted">
            <v-tour name="tutorial" :steps="tourSteps" :callbacks="tourCallbacks"
                :options="{ useKeyboardNavigation: false }" />
        </template>

    </div>
</template>

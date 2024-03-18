<script setup lang="ts">
import G from "~/lib/glitch/types";
import { EditorDisplayedText, EditorPresets } from "#components";
import { type Preset } from "~/lib/toolbox/presets";
import Glitch from "~/lib/glitch";
import * as EditorUtils from "~/lib/editor/utils";
import { isTourDone, redirectHelp, setTourDone } from "~/lib/editor/tour";

useServerSeoMeta(useTranslatedSeoMeta("editor"));

interface EditorDisplayedTextData
    extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null;
}

interface EditorPresetsData extends Ref<InstanceType<typeof EditorPresets>> {
    savePreset: () => void;
}

const errors = ref<Partial<G.Errors>>({});
const displayedText = ref<EditorDisplayedTextData>();
const glitchedEl = ref<HTMLElement | null>(null);
const presets = ref<EditorPresetsData>();
const currentPercent = ref(0);
const selectedField = ref<G.Field>();
const currentPreset = ref<Preset>();
const gconfig = reactive<G.Config>(getDefaultGlitchConfig());
const bindings = ref<G.Bindings>({
    message: "",
    textStyle: {
        fontSize: "",
        padding: "",
        borderRadius: "",
        height: "",
        backgroundColor: "",
        color: "",
    },
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
    insertField,
};

const onToolboxEvents = {
    removeField,
    closeField,
    presetChanged,
};

let animationDuration = gconfig.animation.duration;
const glitch = new Glitch(gconfig);

gconfig.preventRangesCompute = true;

gconfig.onValidated = (errs: G.Errors | undefined) => {
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
        computeConfig(true);
        selectField(gconfig.ranges[0][0]);
    }
}

function verifySensibleData() {
    if (errors.value["animation.duration"]) {
        glitch.controller?.pause();
    } else {
        glitch.controller?.play();
    }
}

function bindGlitch(newBindings: G.Bindings) {
    if (newBindings) {
        bindings.value = newBindings;
    }
}

function selectFirstRangeField(range?: G.Field[]) {
    const firstFieldRange = (range || gconfig.ranges[0])?.[0];

    if (firstFieldRange) {
        selectField(firstFieldRange);
    }
}

function computeConfig(forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        const data = glitch.computeConfig(gconfig, forceRangeCompute);

        if (data) {
            bindGlitch(data.bindings);
            EditorUtils.setAllColors(gconfig);

            nextTick(() => {
                savePreset();
            });
        }
    }
}

function updateField(newField: G.Field) {
    if (gconfig.ranges[newField.range]) {
        glitch?.computeFields(
            EditorUtils.getFieldsToUpdate(gconfig.ranges, newField),
        );
        EditorUtils.setAllColors(gconfig);
        savePreset();
    }
}

function addEmptyRange() {
    gconfig.ranges.push([getDefaultField(gconfig.ranges.length, 0, 0)]);

    if (!selectedField.value) {
        selectField(gconfig.ranges[0][0]);
    }

    computeConfig(true);
}

function duplicateRange(rangeIndex: number) {
    const rangeNb = gconfig.ranges.length;

    if (rangeNb) {
        EditorUtils.duplicateRange(gconfig.ranges, rangeIndex);
        computeConfig(true);
    }
}

function reversePositions(index: number) {
    const range = gconfig.ranges[index];

    if (range) {
        EditorUtils.reverseRangePositions(range);
        computeConfig(true);
    }
}

function reverseColors(rangeIndex: number) {
    const range = gconfig.ranges[rangeIndex];

    if (range) {
        EditorUtils.reverseRangeColors(range);
        computeConfig(true);
    }
}

function removeField(field: G.Field) {
    if (
        field.index === selectedField.value?.index &&
        field.range === selectedField.value?.range
    ) {
        closeField();
    }

    EditorUtils.removeField(gconfig.ranges, field);
    computeConfig(true);

    nextTick(() => {
        selectFirstRangeField(gconfig.ranges[field.range]);
    });
}

function removeRange(rangeIndex: number) {
    if (rangeIndex === selectedField.value?.range) {
        closeField();
    }

    EditorUtils.removeRange(gconfig.ranges, rangeIndex);
    computeConfig(true);

    nextTick(() => {
        selectFirstRangeField();
    });
}

function selectField(newField: G.Field) {
    selectedField.value = newField;
}

function closeField() {
    selectedField.value = undefined;
}

function insertField(rangeIndex: number, offset: number) {
    const insertedIndex = EditorUtils.addFieldAtOffset(
        gconfig.ranges,
        rangeIndex,
        offset,
    );

    if (insertedIndex !== -1) {
        computeConfig(true);
        selectField(gconfig.ranges[rangeIndex][insertedIndex]);
    }
}

function presetChanged(preset: Preset) {
    currentPreset.value = preset;
    EditorUtils.setConfigFromPreset(gconfig, preset);

    nextTick(() => {
        initConfig();
    });
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
    return errors.value["animation.duration"] === undefined;
});

watch(gconfig.text, () => {
    computeConfig();
});

watch(gconfig.animation, () => {
    const configDuration = gconfig.animation.duration;

    if (configDuration !== animationDuration) {
        if (glitch.canUseAnimation()) {
            animationDuration = configDuration;
            glitch.replaceAnimationDuration(gconfig);

            nextTick(() => {
                savePreset();
            });
        } else {
            computeConfig();
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
        <UiHeading v-show="false" variant="h1">{{
            $t("pages.editor.title")
        }}</UiHeading>
        <div class="h-full space-y-4 md:flex md:space-y-0">
            <div class="space-x-1 md:mr-4 md:w-[70%] lg:w-[75%]">
                <EditorDisplayedText
                    ref="displayedText"
                    v-model="currentPercent"
                    :bindings="bindings"
                    :config="gconfig"
                    :controller="glitch.controller"
                    :has-valid-duration="hasValidDuration"
                />
                <EditorToolboxRanges
                    :key="currentPreset?.id"
                    :config="gconfig"
                    :current-percent="currentPercent"
                    :selected-field="selectedField"
                    v-on="onRangesEvents"
                />
            </div>
            <div class="md:ml-4 md:w-[30%] lg:w-[25%]">
                <div class="mb-4 flex items-center justify-between">
                    <ClientOnly>
                        <EditorPresets
                            ref="presets"
                            :glitch="glitch"
                            :config="gconfig"
                            @preset-change="presetChanged"
                        />
                    </ClientOnly>
                    <div class="flex">
                        <EditorActions :config="gconfig" :glitch="glitch" />
                    </div>
                </div>
                <EditorToolbox
                    :key="currentPreset?.id"
                    v-model:config="gconfig"
                    v-model:field="selectedField"
                    :current-percent="currentPercent"
                    :errors="errors"
                    v-on="onToolboxEvents"
                />
            </div>
        </div>
    </div>
</template>

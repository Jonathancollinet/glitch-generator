<script setup lang="ts">
import type { EditorDisplayedText, EditorPresets } from "#build/components";
import { isTourDone, redirectHelp, setTourDone } from "~/lib/editor/tour";

useServerSeoMeta(useTranslatedSeoMeta("editor"));

const presets = ref<EditorPresetsData>();
const displayedText = ref<EditorDisplayedTextData>();

const {
    currentPercent,
    errors,
    gconfig,
    bindings,
    glitch,
    hasValidDuration,
    selectedField,
    currentFieldKey,

    onRangesEvents,
    onToolboxEvents,

    presetChanged,
    initConfig,
    removeField,
} = useGlitchEditor(onSavePreset);

const { welcomeModal } = useModalWelcome(setTourDone, redirectHelp);

function onSavePreset() {
    presets.value?.savePreset();
}

onMounted(() => {
    if (!isTourDone()) {
        welcomeModal.open();
    }

    initConfig(displayedText.value?.glitchedEl);
});
</script>

<template>
    <div>
        <UiHeading v-show="false" variant="h1">
            {{ $t("pages.editor.title") }}
        </UiHeading>
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
                <EditorRanges
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
                <EditorField
                    v-if="selectedField"
                    :key="currentFieldKey"
                    v-model="selectedField"
                    class="mb-4"
                    :range="gconfig.ranges[selectedField.range]"
                    :errors="errors"
                    @remove-field="removeField"
                />
                <EditorToolbox
                    v-model:config="gconfig"
                    :current-percent="currentPercent"
                    :errors="errors"
                    v-on="onToolboxEvents"
                />
            </div>
        </div>
    </div>
</template>

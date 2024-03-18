<script setup lang="ts">
import type { EditorDisplayedText } from "#build/components";
import { isTourDone, redirectHelp, setTourDone } from "~/lib/editor/tour";

useServerSeoMeta(useTranslatedSeoMeta("editor"));

interface EditorDisplayedTextData
    extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null;
}

const displayedText = ref<EditorDisplayedTextData>();

const {
    currentPercent,
    errors,
    presets,
    selectedField,
    currentPreset,
    gconfig,
    bindings,
    glitch,
    hasValidDuration,
    onRangesEvents,
    onToolboxEvents,
    presetChanged,
    initConfig,
} = useGlitchEditor();

const { welcomeModal } = useModalWelcome(setTourDone, redirectHelp);

onMounted(() => {
    if (!isTourDone()) {
        welcomeModal.open();
    }

    initConfig(displayedText.value?.glitchedEl);
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

<script setup lang="ts">
import type { GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
import Glitch from '~/glitch';

const glitchConfig = reactive<GlitchConfig>(getDefaultGlitchConfig());
const errors = ref<Partial<GlitchErrors>>({});
const bindings: any = ref({});
const glitchedEl = ref<HTMLElement | null>(null);
const playState = ref<AnimationPlayState>("idle");
const selectedFields = ref<GlitchShadowField[]>([]);

let animationProperty = glitchConfig.animation.property;
let glitch: Glitch | null = null;

glitchConfig.preventRangesCompute = true

glitchConfig.onValidated = (errs: GlitchErrors | undefined) => {
    if (errs) {
        errors.value = errs;
    } else {
        errors.value = {};
    }
}

function bindGlitch(newBindings: any) {
    if (newBindings) {
        bindings.value = newBindings;
    }
    play();
}

function computeConfig(glitchConfig: GlitchConfig, forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        glitch.computeConfig(glitchConfig, forceRangeCompute)
            .then(bindGlitch)
            .catch((err: Error) => {
                console.error(err);
            });
    }
}

function play() {
    glitch?.play();
    playState.value = "running";
}

function pause() {
    glitch?.pause();
    playState.value = "paused";
}


function selectField(field: GlitchShadowField) {
    // ctrl + click on a field
    selectedFields.value.push(field);
}

function selectUniqueField(field: GlitchShadowField) {
    // simple click on a field
    selectedFields.value.length = 0;
    selectedFields.value.push(field)
}

function shiftSelect(selectedField: GlitchShadowField) {
    const isOpened = selectedFields.value.includes(selectedField);
    if (isOpened) {
        selectedFields.value.splice(selectedFields.value.indexOf(selectedField), 1);
    }
    selectedFields.value.push(selectedField);
}

function selectAllFieldsTo(field: GlitchShadowField) {
    // shift + click on a field
    if (selectedFields.value.length === 0) {
        selectField(field);
    } else {
        const range = field.range;
        const lastSelectField = selectedFields.value[selectedFields.value.length - 1];
        const lastSelectedFieldIndex = lastSelectField.index;
        const lastSelectedFieldRange = lastSelectField.range;

        if (range !== lastSelectedFieldRange) {
            // todo: manage shift + click on different ranges
        }

        // works only for the same range
        if (field.index < lastSelectedFieldIndex) {
            for (let i = lastSelectedFieldIndex; i >= field.index; --i) {
                shiftSelect(glitchConfig.ranges[range][i]);
            }
        } else {
            for (let i = lastSelectedFieldIndex; i <= field.index; ++i) {
                shiftSelect(glitchConfig.ranges[range][i]);
            }
        }
    }

}

function deselectField(field: GlitchShadowField) {
    // ctrl + click on a selected field
    const index = selectedFields.value.findIndex((selectedField) => selectedField.range === field.range && selectedField.index === field.index);
    if (index > -1) {
        selectedFields.value.splice(index, 1);
    }
}

watch(glitchConfig.text, () => {
    computeConfig(glitchConfig)
});

watch(glitchConfig.animation, () => {
    const configProperty = glitchConfig.animation.property;
    const propertyHasChanged = configProperty !== animationProperty;

    if (propertyHasChanged) {
        animationProperty = configProperty;
    }

    computeConfig(glitchConfig, propertyHasChanged)
});

watch(glitchConfig.ranges, () => {
    glitch?.computeFields(selectedFields.value);
});

onMounted(() => {
    if (glitchedEl.value) {
        glitch = new Glitch(glitchConfig, glitchedEl.value);
        glitchConfig.controls = glitch.hasAnimationBrowserCompatibility();
        computeConfig(glitchConfig, true);
    }
});

onBeforeUnmount(() => {
    if (glitch) {
        glitch.destroy();
    }
});
</script>

<template>
    <div>
        <UiHeading class="text-center">{{ $t('pages.editor.title') }}</UiHeading>
        <EditorDisplayedText>
            <div class="text-center" ref="glitchedEl" :style="bindings.textStyle">
                {{ bindings.message }}
            </div>
            <template v-slot:controls>
                <EditorControls :playState="playState" @play="play()" @pause="pause()" />
            </template>
        </EditorDisplayedText>
        {{ selectedFields }}
        <EditorToolbox
            v-model="glitchConfig"
            :errors="errors"
            :selectedFields="selectedFields"
            @selectUniqueField="selectUniqueField"
            @selectAllFieldsTo="selectAllFieldsTo"
            @deselectField="deselectField"
            @selectField="selectField" />
        <EditorExporter :config="glitchConfig" />
    </div>
</template>

<script setup lang="ts">

import type { GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
import Glitch from '~/glitch';
import { EditorDisplayedText } from '#components';

interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null
}

const glitchConfig = reactive<GlitchConfig>(getDefaultGlitchConfig());
const errors = ref<Partial<GlitchErrors>>({});
const bindings = ref<GlitchBindings>({
    message: '',
    textStyle: {
        fontSize: "",
        color: ""
    }
});

const displayedText = ref<EditorDisplayedTextData>();
const glitchedEl = ref<HTMLElement | null>(null);
const currentPercent = ref(0);

let animationDuration = glitchConfig.animation.duration;
let glitch = new Glitch(glitchConfig);

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

function exportKeyframe() {
    console.log(glitch?.exportKeyframes());
}

function updateField(newField: GlitchShadowField) {
    glitch?.computeFields([newField]);
}

watch(glitchConfig.text, () => {
    computeConfig(glitchConfig)
});

watch(glitchConfig.animation, () => {
    const configDuration = glitchConfig.animation.duration;

    if (glitch.hasAnimationBrowserCompatibility() && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);
    } else {
        computeConfig(glitchConfig)
    }
});

onMounted(() => {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
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
        <div class="flex items-center justify-between">
            <UiHeading>{{ $t('pages.editor.title') }}</UiHeading>
            <UiButton @click="exportKeyframe">CSS Keyframes</UiButton>
        </div>
        <EditorDisplayedText ref="displayedText" v-model="currentPercent" :bindings="bindings" :hasControls="glitchConfig.controls" :controller="glitch.controller" :animationDuration="glitchConfig.animation.duration" />
        <EditorToolbox v-model="glitchConfig" :currentPercent="currentPercent" :errors="errors" @updateField="updateField" />
    </div>
</template>

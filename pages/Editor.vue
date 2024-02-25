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

let animationProperty = glitchConfig.animation.property;
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

function updateFields(newFields: GlitchShadowField[]) {
    glitch?.computeFields(newFields);
}

watch(glitchConfig.text, () => {
    computeConfig(glitchConfig)
});

watch(glitchConfig.animation, () => {
    const configProperty = glitchConfig.animation.property;
    const configDuration = glitchConfig.animation.duration;
    const propertyHasChanged = configProperty !== animationProperty;

    if (propertyHasChanged) {
        animationProperty = configProperty;
    }

    if (glitch.hasAnimationBrowserCompatibility() && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);
    } else {
        computeConfig(glitchConfig, propertyHasChanged)
    }
});

onMounted(() => {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
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
        <EditorDisplayedText ref="displayedText" :bindings="bindings" :glitch="glitch" :glitchConfig="glitchConfig" />
        <EditorToolbox v-model="glitchConfig" :errors="errors" @updateFields="updateFields" />
        <EditorExporter :config="glitchConfig" />
    </div>
</template>

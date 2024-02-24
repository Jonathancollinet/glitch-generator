<script setup lang="ts">
import type { GlitchError, GlitchConfig, GlitchErrors } from '~/glitch/types';

const glitchConfig = reactive<GlitchConfig>(defaultGlitchConfig);
const errors = ref<Partial<GlitchErrors>>({});

// glitchConfig.preventRangesValidation = true

glitchConfig.onValidated = (errs: GlitchErrors | undefined) => {
    if (errs) {
        errors.value = errs;
    } else {
        errors.value = {};
    }
}
</script>

<template>
    <div>
        <UiHeading class="text-center">
            {{ $t('pages.editor.title') }}
        </UiHeading>
        <EditorDisplayedText :config="glitchConfig" />
        <EditorToolbox v-model="glitchConfig" :errors="errors" />
        <EditorExporter :config="glitchConfig" />
    </div>
</template>

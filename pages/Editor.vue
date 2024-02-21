<script setup lang="ts">
import { type GlitchConfig } from '~/plugins/glitch/types';
import type { GlitchError } from '~/plugins/glitch/types';

const glitchConfig = reactive<GlitchConfig>(defaultGlitchConfig);

let errors: FrontGlitchError = reactive({});

glitchConfig.onErrors = (errs: GlitchError[]) => {
    errors = {};

    errs.forEach((error) => {
        walkObjectAndSet(errors, error, error.path);
    });
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

<script setup lang="ts">
import { type GlitchConfig } from '~/plugins/glitch/types';
import type { GlitchError } from '~/plugins/glitch/types';
import _set from 'lodash.set';

const glitchConfig = reactive<GlitchConfig>(defaultGlitchConfig);

const errors: FrontGlitchError = reactive({});

glitchConfig.onErrors = (errs: GlitchError[]) => {
    errs.forEach((error) => {
        _set(errors, error.property, {...error});
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

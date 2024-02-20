<script setup lang="ts">
import { type _GlitchConfig } from '~/plugins/glitch/types';
import type { GlitchError } from '~/plugins/glitch/types';
import _set from 'lodash.set';

// default config values
const glitchConfig = reactive<_GlitchConfig>(defaultGlitchConfig);
const errors: any = reactive({});

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

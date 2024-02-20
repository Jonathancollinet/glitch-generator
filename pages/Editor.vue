<script setup lang="ts">
import { defaultConfig } from '~/plugins/gitch-directive';

// default config values
const config = reactive<GlitchConfig>(defaultConfig);
</script>

<template>
    <div>
        <UiHeading class="text-center">
            {{ $t('pages.editor.title') }}
        </UiHeading>
        <EditorDisplayedText :config="config" />
        <EditorToolbox v-model="config" />
        <EditorExporter :config="config" />
    </div>
</template>

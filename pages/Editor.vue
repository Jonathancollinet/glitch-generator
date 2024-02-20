<script setup lang="ts">
import { defaultConfig } from '~/plugins/gitch-directive';
import type { Config } from '~/types/config';

// default config values
const config = reactive<Config>(defaultConfig);
</script>

<template>
    <div>
        <UiHeading class="text-center">
            {{ $t('pages.editor.title') }}
        </UiHeading>
        <DisplayedText :config="config" />
        <Toolbox v-model="config" />
        <Exporter :config="config" />
    </div>
</template>

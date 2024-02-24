<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import type { GlitchConfig, GlitchErrors } from '~/glitch/types';

const config = defineModel<GlitchConfig>({ required: true });

defineProps<{
    errors: Partial<GlitchErrors>
}>()

const localConfig = ref<GlitchConfig>(JSON.parse(JSON.stringify(config.value)));

</script>

<template>
    <div>
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation" :errors="errors" />
    </div>
</template>

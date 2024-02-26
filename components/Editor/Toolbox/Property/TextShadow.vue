<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

</script>

<template>
    <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty" :errors="errors" />
</template>
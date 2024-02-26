<script lang="ts" setup>
import type { GlitchErrors, OptionnalGlitchShadowProperty } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<OptionnalGlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<OptionnalGlitchShadowProperty>('localConfig', { required: true });

</script>

<template>
    <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty" :errors="errors" />
</template>
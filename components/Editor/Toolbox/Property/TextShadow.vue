<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

</script>

<template>
    <div>
        <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty" name="textShadow" :errors="errors" />
    </div>
</template>
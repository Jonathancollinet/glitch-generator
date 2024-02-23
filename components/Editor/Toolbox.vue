<script setup lang="ts">
import type { GlitchConfig, GlitchErrors } from '~/glitch/types';

const config = defineModel<GlitchConfig>();

defineProps<{
    errors: Partial<GlitchErrors>
}>()

const localConfig = ref<GlitchConfig>(JSON.parse(JSON.stringify(config.value)));

</script>

<template>
    <div v-if="config">
        <EditorToolboxText v-model:config="config" v-model:localConfig="localConfig" :errors="errors" />
    </div>
    <div v-else>
        Oops.. config is not defined :/
    </div>
</template>

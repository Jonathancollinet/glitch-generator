<script lang="ts" setup>
import Glitch from '~/glitch';
import type { GlitchConfig } from '~/glitch/types';

const props = defineProps<{
    config: GlitchConfig,
}>();

let bindings: any = ref({});
const glitch = new Glitch(props.config);

bindings.value = glitch.computeConfig(props.config);

watch(props.config, (config) => {
    const newBindings = glitch.computeConfig(config);

    if (newBindings) {
        bindings.value = newBindings;
    }
});
</script>

<template>
    <div :style="bindings.textStyle">
        {{ bindings.message }}
    </div>
</template>

<style></style>
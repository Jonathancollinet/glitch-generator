<script lang="ts" setup>
import type { GlitchColor } from '~/glitch/types';

const props = defineProps<{
    color: GlitchColor
}>();

const colorStyle = computed(() => {
    return {
        background: hexToRGB(props.color.hex, props.color.alphaPercent)
    }
});
</script>

<template>
    <div class="h-full w-full border-2" :style="colorStyle" />
</template>
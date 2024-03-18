<script lang="ts" setup>
import G from "~/lib/glitch/types";

const props = defineProps<{
    color: G.Color;
}>();

const colorStyle = computed(() => {
    return {
        background: hexToRGB(props.color.hex, props.color.alphaPercent),
    };
});
</script>

<template>
    <div class="h-full w-full border-2" :style="colorStyle" />
</template>

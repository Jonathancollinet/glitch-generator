<script lang="ts" setup>
const props = defineProps<{
    currentPercent: number
}>();

const cursorStyle = computed(() => {
    return {
        left: `calc(${props.currentPercent}% - 1px)`
    };
});
</script>

<template>
    <div class="absolute z-20 h-full pointer-events-none mix-blend-exclusion bg-neutral-50 w-[2px] top-0 will-change-auto"
        :style="cursorStyle" />
</template>
<script lang="ts" setup>
const props = defineProps<{
    currentPercent: number;
}>();

const cursorStyle = computed(() => {
    return {
        left: `calc(${props.currentPercent}% - 1px)`,
    };
});
</script>

<template>
    <div
        class="pointer-events-none absolute top-0 z-20 h-full w-[2px] bg-neutral-50 mix-blend-exclusion"
        :style="cursorStyle"
    />
</template>

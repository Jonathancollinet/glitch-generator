<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
}>()

const TooltipContentClass = [
    "absolute z-30 inline-flex flex-col p-2 transition-[background-color] select-none",
    "border-2 border-primary-500",
    "bg-primary-50",
    "space-y-1",
    "dark:bg-neutral-800",
]
</script>

<template>
  <div :class="cn(TooltipContentClass, props.class ?? '')">
    <slot />
  </div>
</template>

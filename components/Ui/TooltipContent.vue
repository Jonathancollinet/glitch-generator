<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
}>()

const TooltipContentClass = [
    "absolute z-30 ml-2 inline-flex flex-col p-2 transition-[background-color] select-none",
    "rounded-xl border-2 border-primary-500",
    "bg-primary-50",
    "*:mb-1 [&>*:last-child]:mb-0",
    "dark:bg-neutral-800",
]
</script>

<template>
  <div :class="cn(TooltipContentClass, props.class ?? '')">
    <slot />
  </div>
</template>

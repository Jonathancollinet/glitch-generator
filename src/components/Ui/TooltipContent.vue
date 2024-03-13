<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { TooltipContentVariants, type TooltipContentVariantsProps } from '~/componentsVariants/Ui/TooltipContent';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    variant?: TooltipContentVariantsProps['variant'],
    size?: TooltipContentVariantsProps['size'],
}>()
</script>

<template>
  <div :class="cn(TooltipContentVariants({ variant, size }), props.class ?? '')">
    <slot />
  </div>
</template>

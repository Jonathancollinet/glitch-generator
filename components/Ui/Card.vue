<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
}>();

const cardClasses: ClassValue[] = [
    'border border-primary-900 rounded-2xl mb-4 last:mb-0 transition-[background-color]',
    'bg-primary-100',
    'dark:bg-neutral-700',
]
</script>

<template>
  <div :class="cn(cardClasses, props.class)">
    <div v-if="$slots.title" class="*:m-0 px-4 py-2 bg-primary-500 rounded-t-2xl text-neutral-50">
        <slot name="title" />
    </div>
    <div class="p-4">
        <slot name="content" />
    </div>
  </div>
</template>
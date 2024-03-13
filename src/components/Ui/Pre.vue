<script setup lang="ts">
import type { ClassValue } from 'class-variance-authority/types';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
}>();

const preClasses: ClassValue[] = [
    'bg-primary-200 dark:bg-primary-950 h-full p-4 max-h-[250px] overflow-auto'
]
</script>

<template>
    <pre :class="cn(preClasses, props.class ?? '')"><slot /></pre>
</template>
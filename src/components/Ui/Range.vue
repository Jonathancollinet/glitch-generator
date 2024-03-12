<script lang="ts" setup>
import type { applyUpdater } from '~/utils/Toobox/utils';

defineProps<{
    min: string | number,
    max: string | number,
    modelValue: string | number,
    onUpdate: ReturnType<typeof applyUpdater>
}>();
</script>

<template>
    <input type="range" :min="min" :max="max" :value="modelValue" @input="onUpdate" />
</template>
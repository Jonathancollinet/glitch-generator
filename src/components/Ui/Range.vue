<script lang="ts" setup>
import type { UpdateFn } from '~/utils/Toobox/utils';

defineProps<{
    min: string | number,
    max: string | number,
    modelValue: string | number,
    onUpdate: UpdateFn
}>();
</script>

<template>
    <input class="cursor-pointer" type="range" :min="min" :max="max" :value="modelValue" @input="onUpdate" />
</template>
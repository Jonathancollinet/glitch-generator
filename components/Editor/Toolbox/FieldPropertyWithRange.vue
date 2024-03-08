<script lang="ts" setup>
import type { applyUpdater } from '~/utils/Toobox/utils';

withDefaults(defineProps<{
    label: string,
    value: string | number | undefined,
    name: string,
    min?: string | number,
    max?: string | number,
    error?: string,
    update: ReturnType<typeof applyUpdater>
}>(), {
    min: '-256',
    max: '256'
});
</script>

<template>
    <UiFormGroup inline :label="label" class="w-full ml-0" alignment="center" :error="error" :name="name">
        <UiInput class="w-[40px]" alignment="center" type="number" :name="name" :modelValue="value"
            :onUpdate="update" />
        <input class="ml-2 max-w-[75px] xl:max-w-full" type="range" :min="min" :max="max" :value="value"
            @input="update" />
    </UiFormGroup>
</template>
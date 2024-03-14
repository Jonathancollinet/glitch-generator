<script lang="ts" setup>
import type { UpdateFn } from '~/utils/Toobox/utils';

withDefaults(defineProps<{
    label: string,
    value?: string | number,
    name: string,
    min?: string | number,
    max?: string | number,
    error?: string,
    update: UpdateFn
}>(), {
    value: 0,
    min: '-256',
    max: '256'
});
</script>

<template>
    <UiFormGroup inline :label="label" class="w-full ml-0" :error="error" :name="name">
        <UiInput class="w-[40px]" alignment="center" type="tel" :name="name" :modelValue="value" :onUpdate="update" />
        <UiRange class="ml-2 w-[calc(75%-40px)] md:max-w-[100px] lg:max-w-full lg:w-[calc(90%-40px)]" :min="min" :max="max" :modelValue="value"
            :onUpdate="update" />
    </UiFormGroup>
</template>
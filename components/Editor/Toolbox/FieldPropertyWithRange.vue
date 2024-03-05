<script lang="ts" setup>
import type { applyUpdater } from '~/utils/Toobox/utils';

defineProps<{
    label: string,
    value: number,
    name: string,
    error?: string,
    update: ReturnType<typeof applyUpdater>
}>()
</script>

<template>
        <UiFormGroup inline :label="label" class="w-full ml-0" alignment="center"
            :error="error" :name="name">
            <UiInput class="w-[40px]" alignment="center" type="number" :name="name"
                :modelValue="value" @update:modelValue="update" />
            <input class="ml-2 max-w-[100px] xl:max-w-full" type="range" min="0" max="256" :value="value" @input="update" />
        </UiFormGroup>
</template>
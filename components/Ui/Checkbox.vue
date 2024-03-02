<script lang="ts" setup>
defineProps<{
    label: string,
    error: string | undefined,
    name: string,
    checked: boolean,
    updateFn: ((event: Event) => void) | undefined,
}>();
</script>

<template>
    <UiFormGroup class="flex *:cursor-pointer select-none" :label="label" :error="error" :name="name">
        <template #before>
            <input class="mr-1" type="checkbox" :id="name" :name="name" :checked="checked" @change="updateFn">
        </template>
    </UiFormGroup>
</template>
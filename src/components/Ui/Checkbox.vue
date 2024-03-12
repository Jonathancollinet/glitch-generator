<script lang="ts" setup>
defineProps<{
    label: string,
    error: string | undefined,
    name: string,
    checked: boolean,
    updateFn: ((event: Event) => void) | undefined,
}>();

const checkbox = ref<HTMLInputElement | null>(null);
</script>

<template>
    <UiFormGroup class="flex items-center cursor-pointer *:cursor-pointer select-none" :label="label" :error="error" :name="name">
        <template #before>
            <div v-if="checkbox" class="w-3 h-3 border bg-neutral-50" @click="checkbox.click()">
                <div v-if="checked" class="h-full w-full bg-primary-600 group-hover/fg:bg-primary-400" />
            </div>
            <input ref="checkbox" class="hidden" type="checkbox" :id="name" :name="name" :checked="checked" @change="updateFn">
        </template>
    </UiFormGroup>
</template>
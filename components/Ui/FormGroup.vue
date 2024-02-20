<script lang="ts" setup>
defineProps<{
    label?: string,
    name: string,
    error?: string,
}>();
</script>

<template>
    <div>
        <label v-if="label" :for="name">{{ $t(label) }}</label>
        <slot />
        <UiText v-if="error" as="div" class="text-xs mt-1 text-red-600 italic">{{ $t(error) }}</UiText>
    </div>
</template>
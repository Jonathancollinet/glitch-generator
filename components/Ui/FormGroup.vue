<script lang="ts" setup>
defineProps<{
    label?: string,
    name: string,
    error?: string,
}>();
</script>

<template>
    <div class="mb-2 pb-2 border-b last:mb-0 last:pb-2 last:border-b-0">
        <label class="block" v-if="label" :for="name">{{ $t(label) }}</label>
        <slot />
        <UiText v-if="error" as="div" class="text-xs mt-1 text-red-600 italic">{{ $t(error) }}</UiText>
    </div>
</template>
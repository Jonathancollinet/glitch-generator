<script lang="ts" setup>

const emit = defineEmits<{
    cancel: []
}>();

function onClose() {
    emit('cancel');
}
</script>

<template>
    <UiModal @closed="onClose">
        <UiHeading class="mb-4 mt-0" variant="h3">{{ $t('modals.shortcuts.title') }}</UiHeading>
        <UiText>{{ $t('modals.shortcuts.leftClickUp') }}</UiText>
        <UiText>{{ $t('modals.shortcuts.rightClickUp') }}</UiText>
        <UiText>{{ $t('modals.shortcuts.leftClickDrag') }}</UiText>
        <UiText>{{ $t('modals.shortcuts.rightClickDrag') }}</UiText>
        <template #footer>
            <UiButton variant="link" size="link" @click="onClose">{{ $t('modals.close') }}</UiButton>
        </template>
    </UiModal>
</template>
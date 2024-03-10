<script lang="ts" setup>
const emit = defineEmits<{
    confirm: [],
    cancel: []
}>();

function onConfirm() {
    emit('confirm')
}

function onCancel() {
    emit('cancel')
}
</script>

<template>
    <UiModalConfirm @confirm="onConfirm" @cancel="onCancel" title="modals.deletePreset.title">
        <UiText>{{ $t('modals.deletePreset.text') }}</UiText>
    </UiModalConfirm>
</template>
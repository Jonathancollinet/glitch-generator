<script lang="ts" setup>
const emit = defineEmits<{
    confirm: [];
    cancel: [];
}>();

function onConfirm() {
    emit("confirm");
}

function onCancel() {
    emit("cancel");
}
</script>

<template>
    <UiModalConfirm title="modals.deletePreset.title" @confirm="onConfirm" @cancel="onCancel">
        <UiText>{{ $t("modals.deletePreset.text") }}</UiText>
    </UiModalConfirm>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    cancel: [];
    start: [];
    close: [];
}>();

function onClose() {
    emit("close");
}

function onStart() {
    emit("start");
}

function onCancel() {
    emit("cancel");
}
</script>

<template>
    <UiModal title="modals.welcome.title" :esc-to-close="false" :click-to-close="false" @closed="onClose">
        <UiText>{{ $t("modals.welcome.content") }}</UiText>
        <UiText>{{ $t("modals.welcome.tutorial") }}</UiText>
        <template #footer>
            <UiButton variant="link" size="link" @click="onCancel">{{ $t("modals.welcome.cancel") }}</UiButton>
            <UiButton @click="onStart">{{ $t("modals.welcome.start") }}</UiButton>
        </template>
    </UiModal>
</template>

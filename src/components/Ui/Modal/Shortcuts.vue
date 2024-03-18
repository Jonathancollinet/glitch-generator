<script lang="ts" setup>
const emit = defineEmits<{
    cancel: [];
}>();

function onClose() {
    emit("cancel");
}
</script>

<template>
    <UiModal title="modals.shortcuts.title" @closed="onClose">
        <PlaygroundRanges class="mb-6" title="modals.shortcuts.playground" />
        <UiText as="div">- {{ $t("modals.shortcuts.leftClickUp") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.rightClickUp") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.leftClickDrag") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.rightClickDrag") }}</UiText>
        <template #footer>
            <UiButton variant="link" size="link" @click="onClose">{{ $t("modals.close") }}</UiButton>
        </template>
    </UiModal>
</template>

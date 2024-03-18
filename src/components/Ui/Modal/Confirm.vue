<script lang="ts" setup>
defineProps<{
    title?: string;
}>();

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

function onClose() {
    emit("cancel");
}
</script>

<template>
    <UiModal :title="title" @closed="onClose">
        <slot />
        <template #footer>
            <UiButton variant="link" size="sm" @click="onCancel">{{ $t("modals.confirm.cancel") }}</UiButton>
            <UiButton @click="onConfirm">{{ $t("modals.confirm.confirm") }}</UiButton>
        </template>
    </UiModal>
</template>

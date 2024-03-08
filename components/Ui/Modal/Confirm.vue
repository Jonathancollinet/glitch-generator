<script lang="ts" setup>

const emit = defineEmits<{
    confirm: [],
    cancel: []
}>();

function onConfirm() {
    emit('confirm');
}

function onCancel() {
    emit('cancel');
}
</script>

<template>
    <UiModal>
        <slot />
        <div class="flex items-center justify-between *:mr-4 [&>*]:last:mr-0">
            <UiButton variant="link" size="sm" @click="onCancel">{{ $t('modals.confirm.cancel') }}</UiButton>
            <UiButton @click="onConfirm">{{ $t('modals.confirm.confirm') }}</UiButton>
        </div>
    </UiModal>
</template>
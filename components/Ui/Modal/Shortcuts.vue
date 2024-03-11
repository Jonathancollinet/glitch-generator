<script lang="ts" setup>

const emit = defineEmits<{
    cancel: []
}>();

function onClose() {
    emit('cancel');
}
</script>

<template>
    <UiModal @closed="onClose" title="modals.shortcuts.title">
        <div class="space-y-4">
            <UiCard openable :isOpen="false">
                <template #title>
                    <UiText as="div">{{ $t('modals.shortcuts.leftClickUp') }}</UiText>
                </template>
                <template #content>
                    <img class="p-2" src="/leftclick.gif" alt="">
                </template>
            </UiCard>
            <UiCard openable :isOpen="false">
                <template #title>
                    <UiText as="div">{{ $t('modals.shortcuts.rightClickUp') }}</UiText>
                </template>
                <template #content>
                    <img class="p-2" src="/rightclick.gif" alt="">
                </template>
            </UiCard>
            <UiCard openable :isOpen="false">
                <template #title>
                    <UiText as="div">{{ $t('modals.shortcuts.leftClickDrag') }}</UiText>
                </template>
                <template #content>
                    <img class="p-2" src="/leftdrag.gif" alt="">
                </template>
            </UiCard>
            <UiCard openable :isOpen="false">
                <template #title>
                    <UiText as="div">{{ $t('modals.shortcuts.rightClickDrag') }}</UiText>
                </template>
                <template #content>
                    <img class="p-2" src="/rightdrag.gif" alt="">
                </template>
            </UiCard>
        </div>
        <template #footer>
            <UiButton variant="link" size="link" @click="onClose">{{ $t('modals.close') }}</UiButton>
        </template>
    </UiModal>
</template>
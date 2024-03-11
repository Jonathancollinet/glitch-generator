<script lang="ts" setup>

const emit = defineEmits<{
    cancel: []
}>();
function onClose() {
    emit('cancel');
}
</script>

<template>
    <UiModal @closed="onClose" title="modals.import.rules.title">
        <UiText as="div" class="mb-2 underline">{{ $t('modals.import.rules.notSupported') }}:</UiText>
        <div class="space-y-1 mb-4 *:text-neutral-500 *:dark:text-neutral-400">
            <UiText as="div">- {{ $t('modals.import.rules.noInset') }}</UiText>
            <UiText as="div">- {{ $t('modals.import.rules.size') }}</UiText>
        </div>
        <UiText as="div" class="mb-2 underline">{{ $t('modals.import.rules.otherConsiderations') }}:</UiText>
        <div class="space-y-1 mb-4 *:text-neutral-500 *:dark:text-neutral-400">
            <UiText as="div">- {{ $t('modals.import.rules.class') }}</UiText>
            <UiText as="div">- {{ $t('modals.import.rules.keyframes') }}</UiText>
            <UiText as="div">- {{ $t('modals.import.rules.autoPrefixes') }}</UiText>
        </div>
        <UiText as="div" class="mb-2 underline">{{ $t('modals.import.rules.declarationsList') }}:</UiText>
        <div class="space-y-1 *:text-neutral-500 *:dark:text-neutral-400">
            <UiText as="div">- {{ $t('modals.import.rules.textDeclarations') }}</UiText>
            <UiText as="div">- {{ $t('modals.import.rules.keyframesDeclarations') }}</UiText>
            <UiText as="div">- {{ $t('modals.import.rules.otherIgnored') }}</UiText>
        </div>
        <template #footer>
            <UiButton variant="link" size="sm" @click="onClose">{{ $t('modals.close') }}</UiButton>
        </template>
    </UiModal>
</template>
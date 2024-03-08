<script lang="ts" setup>
const emit = defineEmits<{
    cancel: [],
    import: [presetName: string, code: string]
}>();

const importedCode = ref('');
const presetName = ref('');

function onCancel() {
    emit('cancel')
}

function onImport() {
    emit('import', presetName.value, importedCode.value);
}
</script>

<template>
    <UiModal contentClass="w-auto">
        <UiText>{{ $t('modals.import.description') }}</UiText>
        <div class="w-full">
            <UiFormGroup label="modals.import.name" name="name">
                <UiInput name="name" class="w-full" v-model="presetName" />
            </UiFormGroup>
            <UiFormGroup class="ml-0" label="modals.import.code" name="code">
                <UiInput type="textarea" name="code" class="w-full h-56" v-model="importedCode" />
            </UiFormGroup>
        </div>
        <template #footer>
            <UiButton variant="link" size="sm" @click="onCancel">{{ $t('modals.confirm.cancel') }}</UiButton>
            <UiButton @click="onImport">{{ $t('modals.import.action') }}</UiButton>
        </template>
    </UiModal>
</template>
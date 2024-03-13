<script lang="ts" setup>
defineProps<{
    errors: Record<string, string>
}>();

const emit = defineEmits<{
    cancel: [],
    import: [presetName: string, textStyle: string, keyframes: string]
}>();

const textStyle = ref('');
const importedCode = ref('');
const presetName = ref('');

function onCancel() {
    emit('cancel')
}

function onImport() {
    emit('import', presetName.value, textStyle.value, importedCode.value);
}
</script>

<template>
    <UiModal contentClass="w-auto" @closed="onCancel" title="modals.import.title">
        <UiText>
            {{ $t('modals.import.description') }}
            <OpenImportRules />
        </UiText>

        <div class="w-full">
            <UiFormGroup label="modals.import.presetName" name="presetName" :error="errors.presetName">
                <UiInput name="presetName" class="w-full" v-model="presetName" />
            </UiFormGroup>
            <UiFormGroup class="ml-0" label="modals.import.textStyle" name="textStyle" :error="errors.textStyle">
                <UiInput placeholder=".className { ..." type="textarea" name="textStyle" class="w-full h-32"
                    v-model="textStyle" />
            </UiFormGroup>
            <UiFormGroup class="ml-0" label="modals.import.code" name="code" :error="errors.keyframes">
                <UiInput placeholder="@keyframes animationName { ..." type="textarea" name="code" class="w-full h-56"
                    v-model="importedCode" />
            </UiFormGroup>
        </div>
        <template #footer>
            <UiButton variant="link" size="sm" @click="onCancel">{{ $t('modals.confirm.cancel') }}</UiButton>
            <UiButton @click="onImport">{{ $t('modals.import.action') }}</UiButton>
        </template>
    </UiModal>
</template>
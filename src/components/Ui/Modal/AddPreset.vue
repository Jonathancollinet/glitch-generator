<script lang="ts" setup>
defineProps<{
    errors: Record<string, string>
}>();

const presetName = ref('')

const emit = defineEmits<{
    confirm: [presetName: string],
    cancel: []
}>();

function onConfirm() {
    emit('confirm', presetName.value)
}

function onCancel() {
    emit('cancel')
}
</script>

<template>
    <UiModalConfirm @confirm="onConfirm" @cancel="onCancel" title="modals.addPreset.title">
        <UiFormGroup label="modals.addPreset.presetName" name="presetName" :error="errors.name">
            <UiInput name="presetName" v-model="presetName" @keypress.enter="onConfirm" />
        </UiFormGroup>
    </UiModalConfirm>
</template>
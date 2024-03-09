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
    <UiModalConfirm @confirm="onConfirm" @cancel="onCancel">
        <UiFormGroup label="modals.addPreset.title" name="presetName" :error="errors.name">
            <UiInput name="presetName" v-model="presetName" />
        </UiFormGroup>
    </UiModalConfirm>
</template>
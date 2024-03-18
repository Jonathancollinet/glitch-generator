<script lang="ts" setup>
defineProps<{
    errors: Record<string, string>;
}>();

const presetName = ref("");

const emit = defineEmits<{
    confirm: [presetName: string];
    cancel: [];
}>();

function onConfirm() {
    emit("confirm", presetName.value);
}

function onCancel() {
    emit("cancel");
}
</script>

<template>
    <UiModalConfirm title="modals.addPreset.title" @confirm="onConfirm" @cancel="onCancel">
        <UiFormGroup label="modals.addPreset.presetName" name="presetName" :error="errors.name">
            <UiInput v-model="presetName" name="presetName" @keypress.enter="onConfirm" />
        </UiFormGroup>
    </UiModalConfirm>
</template>

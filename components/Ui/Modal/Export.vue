<script lang="ts" setup>
import type Glitch from '~/glitch';

const props = defineProps<{
    glitch: Glitch
}>();

const emit = defineEmits<{
    cancel: []
}>();

const data = props.glitch.getDataToExport();

function onCancel() {
    emit('cancel')
}

const cssString = computed(() => {
    return `#text {\n${data.elementStyle}}\n\n${data.keyframes}`;
});
</script>

<template>
    <UiModal contentClass="w-auto" @cancel="onCancel">
        <UiText>{{ $t('modals.export.description') }}</UiText>
        <div class="w-full">
            <UiFormGroup label="modals.export.code" name="code">
                <UiInput type="textarea" name="code" class="w-full h-56" readonly :modelValue="cssString" />
            </UiFormGroup>
        </div>
    </UiModal>
</template>
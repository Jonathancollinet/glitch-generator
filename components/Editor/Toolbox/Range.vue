<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    selectedFields: GlitchShadowField[]
}>()

const range = defineModel<GlitchShadowField[]>('config', { required: true });
const localRange = defineModel<GlitchShadowField[]>('localConfig', { required: true });

const emit = defineEmits<{
    selectAllFieldsTo: [field: GlitchShadowField]
    selectField: [field: GlitchShadowField]
    selectUniqueField: [field: GlitchShadowField]
    deselectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

function selectUniqueField(field: GlitchShadowField) {
    emit('selectUniqueField', field);
}

function selectAllFieldsTo(field: GlitchShadowField) {
    emit('selectAllFieldsTo', field);
}

function deselectField(field: GlitchShadowField) {
    emit('deselectField', field);
}

function isFieldSelected(field: GlitchShadowField) {
    return !!props.selectedFields.find((selectedField) => selectedField.range === field.range && selectedField.index === field.index);
}

function isLastSelected(fieldIndex: number, fieldRange: number) {
    if (props.selectedFields.length) {
        const lastSelected = props.selectedFields[props.selectedFields.length - 1];
        return lastSelected.index === fieldIndex && lastSelected.range === fieldRange;
    }
    return false;
}
</script>

<template>
    <div>
        <EditorToolboxField
            v-for="(field, index) in localRange" :key="index"
            v-model:config="range[index]"
            v-model:localConfig="localRange[index]"
            :errors="errors"
            :selected="isFieldSelected(field)"
            :isLastSelected="isLastSelected(field.index, field.range)"
            @selectAllFieldsTo="selectAllFieldsTo"
            @selectUniqueField="selectUniqueField"
            @deselectField="deselectField"
            @selectField="selectField" />
    </div>
</template>

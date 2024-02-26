<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    selectedField: GlitchShadowField | undefined
}>()

const range = defineModel<GlitchShadowField[]>('config', { required: true });
const localRange = defineModel<GlitchShadowField[]>('localConfig', { required: true });

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

function isFieldSelected(field: GlitchShadowField) {
    return !!props.selectedField && props.selectedField.range === field.range
        && props.selectedField.index === field.index;
}
</script>

<template>
    <EditorToolboxSelectableField
        v-for="(field, index) in localRange" :key="index"
        v-model:config="range[index]"
        v-model:localConfig="localRange[index]"
        :errors="errors"
        :selected="isFieldSelected(field)"
        @selectField="selectField" />
</template>

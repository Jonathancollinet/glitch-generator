<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    range: GlitchShadowField[],
    selectedField: GlitchShadowField | undefined
}>()

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
    <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
        :field="field" :selected="isFieldSelected(field)"
        @selectField="selectField" />
</template>

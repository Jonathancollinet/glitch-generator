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
    <div class="bg-neutral-200 mb-4 h-[150px]">
        <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
        :field="field" :selected="isFieldSelected(field)"
        :width="(range[index + 1]?.offsetFrame || 100) - field.offsetFrame + '%'"
        @selectField="selectField" />
    </div>
</template>

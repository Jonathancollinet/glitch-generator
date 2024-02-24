<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
    selectedFields: GlitchShadowField[]
}>()

const ranges = defineModel<GlitchShadowField[][]>('config', { required: true });
const localRanges = defineModel<GlitchShadowField[][]>('localConfig', { required: true });

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
</script>

<template>
    <div>
        <EditorToolboxRange v-for="(range, index) in localRanges" :key="index" v-model:config="ranges[index]"
            v-model:localConfig="localRanges[index]" :errors="errors"
            :selectedFields="selectedFields"
            @selectAllFieldsTo="selectAllFieldsTo"
            @selectUniqueField="selectUniqueField" @deselectField="deselectField" @selectField="selectField" />
    </div>
</template>

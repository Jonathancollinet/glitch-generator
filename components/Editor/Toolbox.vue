<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import type { GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
    selectedFields: GlitchShadowField[]
}>()

const config = defineModel<GlitchConfig>({ required: true });

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

const localConfig = ref<GlitchConfig>(JSON.parse(JSON.stringify(config.value)));

</script>

<template>
    <div>
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation" :errors="errors" />
        <EditorToolboxRanges v-model:config="config.ranges" v-model:localConfig="localConfig.ranges" :errors="errors" :selectedFields="selectedFields"
            @selectAllFieldsTo="selectAllFieldsTo" @selectField="selectField" @selectUniqueField="selectUniqueField" @deselectField="deselectField" />
    </div>
</template>

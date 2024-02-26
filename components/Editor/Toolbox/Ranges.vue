<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
    selectedField: GlitchShadowField | undefined
}>()

const ranges = defineModel<GlitchShadowField[][]>('config', { required: true });
const localRanges = defineModel<GlitchShadowField[][]>('localConfig', { required: true });

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}
</script>

<template>
    <div>
        <EditorToolboxRange v-for="(range, index) in localRanges" :key="index" v-model:config="ranges[index]"
            v-model:localConfig="localRanges[index]" :errors="errors"
            :selectedField="selectedField"
            @selectField="selectField" />
    </div>
</template>

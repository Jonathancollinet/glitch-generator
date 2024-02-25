<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    selected: boolean,
    isLastSelected: boolean
}>()

const field = defineModel<GlitchShadowField>('config', { required: true });

const emit = defineEmits([
    'selectField',
    'selectUniqueField',
    'selectAllFieldsTo',
    'deselectField'
])

function selectField(e: MouseEvent) {
    if (e.ctrlKey) {
        if (props.selected) {
            emit('deselectField', field.value);
        } else {
            emit('selectField', field.value);
        }
    } else if (e.shiftKey) {
        emit('selectAllFieldsTo', field.value);
    } else {
        emit('selectUniqueField', field.value);
    }
}
</script>

<template>
    <div :class="'select-none inline-flex p-2 border-blue-400 bg-blue-200 m-2 ' + (isLastSelected ? 'border-2' : '')"
    @click="selectField">
        <div>Field-{{ field.index }} - {{ selected }}</div>

    </div>
</template>
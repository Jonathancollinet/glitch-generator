<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    field: GlitchShadowField,
    selected: boolean
}>()

const emit = defineEmits([
    'selectField'
])

function selectField() {
    emit('selectField', props.field);
}
</script>

<template>
    <div :class="'select-none inline-flex p-2 border-blue-400 bg-blue-200 m-2 ' + (selected ? 'border-2' : '')"
        @click="selectField">
        <div>Field-{{ field.index }}</div>
    </div>
</template>
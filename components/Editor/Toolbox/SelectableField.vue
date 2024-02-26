<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    selected: boolean
}>()

const field = defineModel<GlitchShadowField>('config', { required: true });

const emit = defineEmits([
    'selectField'
])

function selectField() {
    emit('selectField', field.value);
}
</script>

<template>
    <div :class="'select-none inline-flex p-2 border-blue-400 bg-blue-200 m-2 ' + (selected ? 'border-2' : '')"
    @click="selectField">
        {{ field.properties }}
        <div>Field-{{ field.index }}</div>
    </div>
</template>
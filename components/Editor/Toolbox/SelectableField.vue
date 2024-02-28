<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = withDefaults(defineProps<{
    field: GlitchShadowField,
    selected: boolean,
    width?: string
}>(), {
    width: '100%'
})

const emit = defineEmits([
    'selectField'
])

function selectField() {
    emit('selectField', props.field);
}
</script>

<template>
    <div :class="'h-full cursor-pointer select-none inline-flex border-blue-800 bg-blue-400 border-r ' + (selected ? 'border-r-2' : '')"
        @click="selectField" :style="{width}">
    </div>
</template>
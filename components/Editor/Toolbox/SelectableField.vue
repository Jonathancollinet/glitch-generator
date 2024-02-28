<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = withDefaults(defineProps<{
    field: GlitchShadowField,
    isSelected: boolean,
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
    <div :class="'relative z-20 h-full cursor-pointer select-none inline-flex border-l [&.border-l-transparent+.border-l-neutral-800]:border-l-transparent first:border-l-0 ' + (isSelected ? 'bg-blue-50 opacity-50 border-l-transparent' : 'border-l-neutral-800')"
        @click="selectField" :style="{width}">
    </div>
</template>
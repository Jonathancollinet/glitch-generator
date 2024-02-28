<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

defineProps<{
    ranges: GlitchShadowField[][],
    selectedField: GlitchShadowField | undefined
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}
</script>

<template>
    <div class="p-4 border">
        <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField"
            :range="range"
            @selectField="selectField" />
    </div>
</template>

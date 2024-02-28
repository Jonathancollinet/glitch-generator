<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    ranges: GlitchShadowField[][],
    selectedField: GlitchShadowField | undefined,
    hasControls: boolean,
    currentPercent: number
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
    addRange: [],
    addField: [rangeIndex: number, field: GlitchShadowField]
}>()

function addField(field: GlitchShadowField) {
    emit('addField', field.range, field);
}

function addRange() {
    emit('addRange');
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

</script>

<template>
    <div class="relative border p-4">
        <div class="relative w-[calc(100%-20px)]">
            <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField" :range="range"
                @selectField="selectField" @addField="addField" />
            <ClientOnly>
                <div v-if="hasControls" class="absolute z-10 bg-blue-400 rounded-full w-[2px] h-full top-0" :style="{left: `calc(${currentPercent}% - 1px)`}" />
            </ClientOnly>
        </div>
        <UiButton variant="icon" size="icon" @click="addRange">+</UiButton>
    </div>
</template>

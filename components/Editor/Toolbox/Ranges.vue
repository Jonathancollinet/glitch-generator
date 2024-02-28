<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    ranges: GlitchShadowField[][],
    selectedField: GlitchShadowField | undefined,
    hasControls: boolean,
    currentPercent: number
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

</script>

<template>
    <div class="relative border">
        <div class="relative m-4">
            <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField" :range="range"
                @selectField="selectField" />
            <ClientOnly>
                <div v-if="hasControls" class="absolute z-10 bg-blue-400 rounded-full w-[2px] h-full top-0" :style="{left: `calc(${currentPercent}% - 1px)`}" />
            </ClientOnly>
        </div>
    </div>
</template>

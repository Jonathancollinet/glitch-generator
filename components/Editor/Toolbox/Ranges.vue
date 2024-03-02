<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    textFontSize: number,
    ranges: GlitchShadowField[][],
    selectedField?: GlitchShadowField,
    hasControls: boolean,
    currentPercent: number
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
    addRange: [],
    addField: [rangeIndex: number]
}>()

function addField(rangeIndex: number) {
    emit('addField', rangeIndex);
}

function addRange() {
    emit('addRange');
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

</script>

<template>
    <div class="relative py-4">
        <div class="flex mb-2">
            <div class="relative w-[calc(100%-24px)]">
                <ClientOnly>
                    <div v-if="hasControls"
                        class="absolute z-0 bg-neutral-950 w-[2px] top-0"
                        :style="{ left: `calc(${currentPercent}% - 1px)`, height: `calc(${24 * ranges.length}px + ${1 * ranges.length - 1}rem)` }" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField"
                    :textFontSize="textFontSize" :range="range" @selectField="selectField" />
            </div>
            <div class="w-[24px]">
                <UiButton v-for="(range, index) in ranges" :key="index" class="relative top-0 h-[24px] mb-4 last:mb-0" variant="ghost" size="icon" @click="addField(index)">
                    +
                </UiButton>
            </div>
        </div>
        <UiButton variant="ghost" size="icon" @click="addRange">+</UiButton>
    </div>
</template>

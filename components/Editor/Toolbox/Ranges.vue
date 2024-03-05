<script lang="ts" setup>
import { Icons, Modes } from '~/types/enums';
import type { GlitchConfig, GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    selectedField?: GlitchShadowField,
    config: GlitchConfig,
    currentPercent: number
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
    addEmptyRange: [],
    duplicateRange: [index: number],
    reversePositions: [index: number],
    reverseColors: [index: number],
    addField: [rangeIndex: number],
    removeRange: [index: number]
}>()

const openAddRangeOptions = ref(false);
const showRangeOptions = ref<boolean[]>(new Array(props.config.ranges.length).fill(false));

function resetRangeOptions() {
    showRangeOptions.value = new Array(props.config.ranges.length).fill(false);
}

function displayRangeOptions(index: number) {
    const prev = !showRangeOptions.value[index];
    resetRangeOptions();
    showRangeOptions.value[index] = prev;
}

function displayAddRangeOptions() {
    openAddRangeOptions.value = !openAddRangeOptions.value;
}

function closeAddRangeOptions() {
    openAddRangeOptions.value = false;
}

function addField(rangeIndex: number) {
    emit('addField', rangeIndex);
    resetRangeOptions();
}

function removeRange(index: number) {
    emit('removeRange', index);
    resetRangeOptions();
}

function duplicateRange(index: number) {
    emit('duplicateRange', index);
    resetRangeOptions();
}

function reversePositions(index: number) {
    emit('reversePositions', index);
    resetRangeOptions();
}

function reverseColors(index: number) {
    emit('reverseColors', index);
    resetRangeOptions();
}

function addEmptyRange() {
    emit('addEmptyRange');
    closeAddRangeOptions();
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

const cursorStyle = computed(() => {
    const rangeNb = props.config.ranges.length;
    
    return {
        left: `calc(${props.currentPercent}% - 1px)`,
        height: `calc(${24 * rangeNb}px + ${1 * rangeNb - 1}rem)`
    }
})

</script>

<template>
    <div class="relative">
        <div class="flex mb-4">
            <div class="relative w-[calc(100%-36px)]">
                <ClientOnly>
                    <div v-if="config.controls" class="absolute z-20 pointer-events-none bg-neutral-950 w-[2px] top-0 will-change-auto" :style="cursorStyle" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in config.ranges" :key="index" :selectedField="selectedField"
                    :textFontSize="config.text.size" :ranges="config.ranges" :range="range" @selectField="selectField" />
            </div>
            <div class="w-[24px] pl-[12px]" v-click-outside="resetRangeOptions">
                <div class="relative top-0 h-[24px] mb-4 last:mb-0" v-for="(range, index) in config.ranges" :key="index">
                    <UiButtonIconTooltip @click="displayRangeOptions(index)">
                        <UiTooltipContent class="whitespace-nowrap -translate-x-[75%]" v-if="showRangeOptions[index]">
                            <UiButton variant="link" size="link" @click="addField(index)">Add a frame</UiButton>
                            <UiButton variant="link" size="link" @click="reversePositions(index)">Reverse positions</UiButton>
                            <UiButton variant="link" size="link" @click="reverseColors(index)">Reverse colors</UiButton>
                            <UiButton variant="link" size="link" @click="duplicateRange(index)">Duplicate range</UiButton>
                            <UiButton variant="link" size="link" @click="removeRange(index)">Remove range</UiButton>
                        </UiTooltipContent>
                    </UiButtonIconTooltip>
                </div>
            </div>
        </div>
        <div class="relative">
            <UiButton variant="link" size="link" @click="addEmptyRange">Add an empty range</UiButton>
        </div>
    </div>
</template>

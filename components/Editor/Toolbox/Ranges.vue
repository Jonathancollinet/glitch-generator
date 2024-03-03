<script lang="ts" setup>
import { Icons } from '~/types/enums';
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
    addEmptyRange: [],
    duplicateRange: [],
    addField: [rangeIndex: number],
    removeRange: [index: number]
}>()

const openAddRangeOptions = ref(false);
const showRangeOptions = ref<boolean[]>(new Array(props.ranges.length).fill(false));

function resetRangeOptions() {
    showRangeOptions.value = new Array(props.ranges.length).fill(false);
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

function duplicateRange() {
    emit('duplicateRange');
    closeAddRangeOptions();
}

function addEmptyRange() {
    emit('addEmptyRange');
    closeAddRangeOptions();
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

</script>

<template>
    <div class="relative py-4">
        <div class="flex mb-2">
            <div class="relative w-[calc(100%-36px)]">
                <ClientOnly>
                    <div v-if="hasControls" class="absolute z-0 bg-neutral-950 w-[2px] top-0"
                        :style="{ left: `calc(${currentPercent}% - 1px)`, height: `calc(${24 * ranges.length}px + ${1 * ranges.length}rem)` }" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField"
                    :textFontSize="textFontSize" :range="range" @selectField="selectField" />
            </div>
            <div class="w-[24px] pl-[12px]">
                <div class="relative top-0 h-[24px] mb-4" v-for="(range, index) in ranges" :key="index">
                    <UiButtonIconTooltip @click="displayRangeOptions(index)">
                        <UiTooltipContent class="whitespace-nowrap -translate-x-[75%]"
                            v-if="showRangeOptions[index]">
                            <UiButton variant="link" size="link" @click="addField(index)">Add a frame</UiButton>
                            <UiButton variant="link" size="link" @click="removeRange(index)">Remove the range</UiButton>
                        </UiTooltipContent>
                    </UiButtonIconTooltip>
                </div>
            </div>
        </div>
        <div class="relative">
            <UiButtonIconTooltip :icon="Icons.Add" @click="displayAddRangeOptions">
                <UiTooltipContent class="whitespace-nowrap" v-if="openAddRangeOptions">
                    <UiButton variant="link" size="link" @click="duplicateRange">Duplicate the last range</UiButton>
                    <UiButton variant="link" size="link" @click="addEmptyRange">Add an empty range</UiButton>
                </UiTooltipContent>
            </UiButtonIconTooltip>
        </div>
    </div>
</template>

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
                        :style="{ left: `calc(${currentPercent}% - 1px)`, height: `calc(${24 * ranges.length}px + ${1 * ranges.length - 1}rem)` }" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in ranges" :key="index" :selectedField="selectedField"
                    :textFontSize="textFontSize" :range="range" @selectField="selectField" />
            </div>
            <div class="w-[24px] pl-[12px]">
                <div class="relative top-0 h-[24px] mb-4 last:mb-0" v-for="(range, index) in ranges" :key="index">
                    <UiButton variant="ghost" size="icon" @click="displayRangeOptions(index)">
                        <UiIcon :icon="Icons.Dots" />
                    </UiButton>
                    <Transition name="fade" mode="out-in">
                        <div class="whitespace-nowrap absolute z-10 ml-2 inline-flex flex-col p-2 bg-primary-50 -translate-x-[75%] top rounded-xl border-2 border-primary-500 *:mb-1 [&>*:last-child]:mb-0"
                            v-if="showRangeOptions[index]">
                            <UiButton variant="link" size="link" @click="addField(index)" :disabled="false">Add a frame</UiButton>
                            <UiButton variant="link" size="link" @click="removeRange(index)">Remove the range</UiButton>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="relative">
            <UiButton variant="ghost" size="icon" @click="displayAddRangeOptions">+</UiButton>
            <Transition name="fade" mode="out-in">
                <div v-if="openAddRangeOptions"
                    class="absolute ml-2 inline-flex flex-col p-2 bg-primary-50 rounded-xl border-2 border-primary-500 *:mb-1 [&>*:last-child]:mb-0">
                    <UiButton variant="link" size="link" @click="duplicateRange">Duplicate the last range</UiButton>
                    <UiButton variant="link" size="link" @click="addEmptyRange">Add an empty range</UiButton>
                </div>
            </Transition>
        </div>
    </div>
</template>

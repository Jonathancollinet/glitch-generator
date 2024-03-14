<script lang="ts" setup>
import { Icons } from '~/types/enums';
import type { GlitchConfig, GlitchShadowField } from '~/glitch/types';
import { rangeHeight } from '~/utils/constants';

const props = defineProps<{
    selectedField?: GlitchShadowField,
    config: GlitchConfig,
    currentPercent: number
}>();

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    selectField: [field: GlitchShadowField],
    addEmptyRange: [],
    duplicateRange: [rangeIndex: number],
    reversePositions: [rangeIndex: number],
    reverseColors: [rangeIndex: number],
    removeRange: [rangeIndex: number],
    insertField: [rangeIndex: number, offset: number],
}>();

const showRangeOptions = ref<boolean[]>(new Array(props.config.ranges.length).fill(false));

function resetRangeOptions() {
    showRangeOptions.value = new Array(props.config.ranges.length).fill(false);
}

function displayRangeOptions(index: number) {
    const prev = !showRangeOptions.value[index];
    resetRangeOptions();
    showRangeOptions.value[index] = prev;
}

function updateField(field: GlitchShadowField) {
    emit('updateField', field);
}

function insertField(rangeIndex: number, offset: number) {
    emit('insertField', rangeIndex, offset);
    resetRangeOptions();
}

function removeRange(rangeIndex: number) {
    emit('removeRange', rangeIndex);
    resetRangeOptions();
}

function duplicateRange(rangeIndex: number) {
    emit('duplicateRange', rangeIndex);
    resetRangeOptions();
}

function reversePositions(rangeIndex: number) {
    emit('reversePositions', rangeIndex);
    resetRangeOptions();
}

function reverseColors(rangeIndex: number) {
    emit('reverseColors', rangeIndex);
    resetRangeOptions();
}

function addEmptyRange() {
    emit('addEmptyRange');
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}
</script>

<template>
    <div class="relative">
        <div class="flex space-x-2 items-center mb-2">
            <UiHeading class="m-0" variant="h4">{{ $t('pages.editor.ranges') }}</UiHeading>
            <OpenShortcuts class="mt-1" />
        </div>
        <div class="flex mb-4">
            <div class="relative z-10 w-[calc(100%-36px)]">
                <ClientOnly>
                    <EditorKeyframesCursor v-if="config.controls" :currentPercent="currentPercent" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in config.ranges" :key="`${index}-${range.length}`"
                    :selectedField="selectedField" :textFontSize="config.text.size" :ranges="config.ranges"
                    :range="range" @updateField="updateField" @selectField="selectField"
                    @insertField="insertField(index, $event)" />
            </div>
            <div class="w-[36px]" v-click-outside="resetRangeOptions">
                <div class="relative top-0 w-full pl-[12px] mb-2 last:mb-0 flex items-center"
                    :style="{ height: rangeHeight + 'px' }" v-for="(range, index) in config.ranges" :key="index">
                    <UiButtonIconTooltip v-tooltip="$t('pages.editor.rangeOptions')"
                        @click="displayRangeOptions(index)">
                        <UiTooltipContent class="whitespace-nowrap -translate-x-[calc(100%+24px)] *:justify-start"
                            v-if="showRangeOptions[index]">
                            <UiButton variant="link" size="link" @click="duplicateRange(index)">
                                {{ $t('pages.editor.config.ranges.actions.duplicate') }}
                            </UiButton>
                            <UiButton variant="link" size="link" @click="reversePositions(index)">
                                {{ $t('pages.editor.config.ranges.actions.reversePositions') }}
                            </UiButton>
                            <UiButton variant="link" size="link" @click="reverseColors(index)">
                                {{ $t('pages.editor.config.ranges.actions.reverseColors') }}
                            </UiButton>
                            <UiButton class="text-red-600 dark:text-red-400" variant="link" size="link"
                                @click="removeRange(index)">
                                {{ $t('pages.editor.config.ranges.actions.removeRange') }}
                            </UiButton>
                        </UiTooltipContent>
                    </UiButtonIconTooltip>
                </div>
            </div>
        </div>
        <div class="flex space-x-2">
            <UiButton variant="link" size="link" v-tooltip="$t('pages.editor.config.ranges.actions.addEmptyRange')"
                @click="addEmptyRange">
                <UiIcon :icon="Icons.Add" />
            </UiButton>
        </div>
    </div>
</template>
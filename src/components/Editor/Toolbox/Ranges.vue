<script lang="ts" setup>
import { Icons } from '~/types/enums';
import type { GlitchConfig, GlitchShadowField } from '~/glitch/types';
import { rangeHeight } from '~/utils/constants';

defineProps<{
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

const onRangeOptions = {
    removeRange,
    duplicateRange,
    reversePositions,
    reverseColors,
};

function updateField(field: GlitchShadowField) {
    emit('updateField', field);
}

function insertField(rangeIndex: number, offset: number) {
    emit('insertField', rangeIndex, offset);
}

function removeRange(rangeIndex: number) {
    emit('removeRange', rangeIndex);
}

function duplicateRange(rangeIndex: number) {
    emit('duplicateRange', rangeIndex);
}

function reversePositions(rangeIndex: number) {
    emit('reversePositions', rangeIndex);
}

function reverseColors(rangeIndex: number) {
    emit('reverseColors', rangeIndex);
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
            <UiHeading class="m-0" variant="h3">{{ $t('pages.editor.ranges') }}</UiHeading>
            <OpenShortcuts class="mt-1" />
        </div>
        <div class="flex mb-4">
            <div class="relative z-10 w-[calc(100%-36px)]">
                <ClientOnly>
                    <EditorKeyframesCursor v-if="config.controls" :currentPercent="currentPercent" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in config.ranges" :key="`${index}-${range.length}`"
                    :selectedField="selectedField" :config="config" :range="range" @updateField="updateField"
                    @selectField="selectField" @insertField="insertField(index, $event)" />
            </div>
            <div class="w-[36px]">
                <div class="relative top-0 w-full pl-[12px] mb-2 last:mb-0 flex items-center"
                    :style="{ height: rangeHeight + 'px' }" v-for="(range, index) in config.ranges" :key="index">
                    <EditorToolboxRangeOptions :rangeIndex="index" :config="config" v-on="onRangeOptions" />
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
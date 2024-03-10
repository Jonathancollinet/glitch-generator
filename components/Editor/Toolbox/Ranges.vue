<script lang="ts" setup>
import { Icons, Modes } from '~/types/enums';
import type { GlitchConfig, GlitchShadowField } from '~/glitch/types';
import { useModalShortcuts } from '~/composables/modalShortcuts';

const props = defineProps<{
    selectedField?: GlitchShadowField,
    config: GlitchConfig,
    currentPercent: number
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    selectField: [field: GlitchShadowField],
    addEmptyRange: [],
    duplicateRange: [rangeIndex: number],
    reversePositions: [rangeIndex: number],
    reverseColors: [rangeIndex: number],
    removeRange: [rangeIndex: number],
    insertField: [rangeIndex: number, offset: number],
}>()

const openAddRangeOptions = ref(false);
const showRangeOptions = ref<boolean[]>(new Array(props.config.ranges.length).fill(false));

const { shortcutsModal } = useModalShortcuts();

function resetRangeOptions() {
    showRangeOptions.value = new Array(props.config.ranges.length).fill(false);
}

function displayRangeOptions(index: number) {
    const prev = !showRangeOptions.value[index];
    resetRangeOptions();
    showRangeOptions.value[index] = prev;
}

function closeAddRangeOptions() {
    openAddRangeOptions.value = false;
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
    closeAddRangeOptions();
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

const cursorStyle = computed(() => {
    const rangeNb = props.config.ranges.length;

    return {
        left: `calc(${props.currentPercent}% - 1px)`
    }
})
</script>

<template>
    <div class="relative">
        <div class="flex space-x-2 items-center mb-4">
            <UiHeading class="m-0" variant="h4">Ranges</UiHeading>
            <UiButton class="mt-1" variant="icon" size="icon" @click="shortcutsModal.open">
                <UiIcon class="stroke-neutral-400" :icon="Icons.Cursor" />
            </UiButton>
        </div>
        <div class="flex mb-4">
            <div class="relative w-[calc(100%-36px)]">
                <ClientOnly>
                    <div v-if="config.controls"
                        class="absolute z-20 h-full pointer-events-none bg-neutral-950 w-[2px] top-0 will-change-auto dark:bg-neutral-50"
                        :style="cursorStyle" />
                </ClientOnly>
                <EditorToolboxRange v-for="(range, index) in config.ranges" :key="`${index}-${range.length}`" :selectedField="selectedField"
                    :textFontSize="config.text.size" :ranges="config.ranges" :range="range" @updateField="updateField"
                    @selectField="selectField" @insertField="insertField(index, $event)" />
            </div>
            <div class="w-[24px] pl-[12px]" v-click-outside="resetRangeOptions">
                <div class="relative top-0 w-full h-[24px] mb-2 last:mb-0" v-for="(range, index) in config.ranges"
                    :key="index">
                    <UiButtonIconTooltip data-v-step="18,19,20" @click="displayRangeOptions(index)">
                        <UiTooltipContent class="whitespace-nowrap -translate-x-[90%] *:justify-start"
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
        <UiButton data-v-step="17" variant="link" size="link" v-tooltip.right="$t('pages.editor.config.ranges.actions.addEmptyRange')" @click="addEmptyRange">
            <UiIcon :icon="Icons.Add" />
        </UiButton>
    </div>
</template>

<script lang="ts" setup>
import G from "~/lib/glitch/types";

const props = defineProps<{
    rangeIndex: number;
    config: G.Config;
}>();

const emit = defineEmits<{
    removeRange: [rangeIndex: number];
    duplicateRange: [rangeIndex: number];
    reversePositions: [rangeIndex: number];
    reverseColors: [rangeIndex: number];
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

function removeRange(rangeIndex: number) {
    emit("removeRange", rangeIndex);
    resetRangeOptions();
}

function duplicateRange(rangeIndex: number) {
    emit("duplicateRange", rangeIndex);
    resetRangeOptions();
}

function reversePositions(rangeIndex: number) {
    emit("reversePositions", rangeIndex);
    resetRangeOptions();
}

function reverseColors(rangeIndex: number) {
    emit("reverseColors", rangeIndex);
    resetRangeOptions();
}
</script>

<template>
    <UiButtonIconTooltip
        v-tooltip="$t('pages.editor.rangeOptions')"
        v-click-outside="resetRangeOptions"
        @click="displayRangeOptions(rangeIndex)"
    >
        <UiTooltipContent
            v-if="showRangeOptions[rangeIndex]"
            class="top-0 -translate-x-full whitespace-nowrap *:justify-start"
        >
            <UiButton variant="link" size="link" @click="duplicateRange(rangeIndex)">
                {{ $t("pages.editor.config.ranges.actions.duplicate") }}
            </UiButton>
            <UiButton variant="link" size="link" @click="reversePositions(rangeIndex)">
                {{ $t("pages.editor.config.ranges.actions.reversePositions") }}
            </UiButton>
            <UiButton variant="link" size="link" @click="reverseColors(rangeIndex)">
                {{ $t("pages.editor.config.ranges.actions.reverseColors") }}
            </UiButton>
            <UiButton color="danger" variant="link" size="link" @click="removeRange(rangeIndex)">
                {{ $t("pages.editor.config.ranges.actions.removeRange") }}
            </UiButton>
        </UiTooltipContent>
    </UiButtonIconTooltip>
</template>

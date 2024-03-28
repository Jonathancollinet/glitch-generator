<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { addFieldAtOffset, getHoveredField } from "~/lib/editor/utils";

const emit = defineEmits<{
    cancel: [];
}>();

const ranges = ref(deepCopy(getExempleRanges()));
const selectedField = ref<G.Field>();

function selectField(field: G.Field) {
    selectedField.value = field;
}

function insertField(rangeIndex: number, offset: number) {
    const hoveredField = getHoveredField(ranges.value[rangeIndex], offset);

    addFieldAtOffset(ranges.value, rangeIndex, hoveredField.index + 1, offset);
}

function onClose() {
    emit("cancel");
}
</script>

<template>
    <UiModal title="modals.shortcuts.title" @closed="onClose">
        <PlaygroundRanges
            class="mb-6"
            :ranges="ranges"
            :selected-field="selectedField"
            title="modals.shortcuts.playground"
            @select-field="selectField"
            @insert-field="insertField"
        />
        <UiText as="div">- {{ $t("modals.shortcuts.leftClickUp") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.rightClickUp") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.leftClickDrag") }}</UiText>
        <UiText as="div">- {{ $t("modals.shortcuts.rightClickDrag") }}</UiText>
        <template #footer>
            <UiButton variant="link" size="link" @click="onClose">{{ $t("modals.close") }}</UiButton>
        </template>
    </UiModal>
</template>

<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { addFieldAtOffset, getHoveredField } from "~/lib/editor/utils";

const props = defineProps<{
    title?: string;
    ranges?: G.Field[][];
    selectedField?: G.Field;
}>();

const emit = defineEmits<{
    selectField: [field: G.Field];
}>();

const ranges = ref<G.Field[][]>(props.ranges || getExempleRanges());

const selectedField = ref<G.Field | undefined>(props.selectedField);

function selectField(field: G.Field) {
    selectedField.value = field;
    emit("selectField", field);
}

function insertField(rangeIndex: number, offset: number) {
    const hoveredField = getHoveredField(ranges.value[rangeIndex], offset);

    addFieldAtOffset(ranges.value, rangeIndex, hoveredField.index + 1, offset);
}

watch(
    () => props.selectedField,
    () => {
        selectedField.value = props.selectedField;
    },
);
</script>

<template>
    <div>
        <UiText v-if="title" as="div" data-color="black">{{ $t(title) }}</UiText>
        <EditorRange
            v-for="(range, index) in ranges"
            :key="`${index}-${range.length}`"
            no-properties
            :range="range"
            :selected-field="selectedField"
            @select-field="selectField"
            @insert-field="insertField(index, $event)"
        />
    </div>
</template>

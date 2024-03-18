<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { addFieldAtOffset } from "~/lib/editor/utils";

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
    addFieldAtOffset(ranges.value, rangeIndex, offset);
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
        <UiText v-if="title" as="div" data-color="black">{{
            $t(title)
        }}</UiText>
        <EditorToolboxRange
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

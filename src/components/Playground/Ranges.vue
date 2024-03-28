<script lang="ts" setup>
import G from "~/lib/glitch/types";

defineProps<{
    title?: string;
    ranges?: G.Field[][];
    selectedField?: G.Field;
}>();

const emit = defineEmits<{
    selectField: [field: G.Field];
    insertField: [rangeIndex: number, offset: number];
}>();

function selectField(field: G.Field) {
    emit("selectField", field);
}

function insertField(rangeIndex: number, offset: number) {
    emit("insertField", rangeIndex, offset);
}
</script>

<template>
    <div>
        <UiText v-if="title" as="div" color="black">{{ $t(title) }}</UiText>
        <EditorRange
            v-for="(range, index) in ranges"
            :key="index"
            no-properties
            :range="range"
            :selected-field="selectedField"
            @select-field="selectField"
            @insert-field="insertField(index, $event)"
        />
    </div>
</template>

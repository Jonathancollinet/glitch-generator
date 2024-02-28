<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    range: GlitchShadowField[],
    selectedField: GlitchShadowField | undefined
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

function isFieldSelected(field: GlitchShadowField) {
    return !!props.selectedField && props.selectedField.range === field.range
        && props.selectedField.index === field.index;
}

function getPercentWidth(currentOffsetFrame: number, nextOffsetFrame: number = 100) {
    return nextOffsetFrame - currentOffsetFrame + '%'
}

function getDataIndex(currentOffsetFrame: number, nextOffsetFrame: number = 100) {
    const indexes: number[] = [];
    const length = nextOffsetFrame - currentOffsetFrame;

    for (let i = 0; i < length; ++i) {
        indexes.push(currentOffsetFrame + i);
    }

    return indexes.toString();
}

onUpdated(() => {
    console.log("range updated")
})
</script>

<template>
    <div class="bg-blue-400 mb-4 h-[20px]">
        <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
        :data-index="getDataIndex(field.offsetFrame, range[index + 1]?.offsetFrame)"
        :field="field" :isSelected="isFieldSelected(field)"
        :width="getPercentWidth(field.offsetFrame, range[index + 1]?.offsetFrame)"
        @selectField="selectField" />
    </div>
</template>

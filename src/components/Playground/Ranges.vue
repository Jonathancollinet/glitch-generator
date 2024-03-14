<script lang="ts" setup>
import { type GlitchShadowField } from '~/glitch/types';
import { addFieldAtOffset } from '~/utils/Editor/utils';

const props = defineProps<{
    title?: string,
    ranges?: GlitchShadowField[][],
    selectedField?: GlitchShadowField,
}>();

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
}>();

const ranges = ref<GlitchShadowField[][]>(props.ranges || getExempleRanges());

const selectedField = ref<GlitchShadowField | undefined>(props.selectedField);

function selectField(field: GlitchShadowField) {
    selectedField.value = field;
    emit('selectField', field);
}

function insertField(rangeIndex: number, offset: number) {
    const range = ranges.value[rangeIndex];

    addFieldAtOffset(range, rangeIndex, offset);
}

watch(() => props.selectedField, () => {
    selectedField.value = props.selectedField;
});
</script>

<template>
    <div>
        <UiText as="div" data-color="black" v-if="title">{{ $t(title) }}</UiText>
        <EditorToolboxRange noProperties v-for="(range, index) in ranges" :key="`${index}-${range.length}`" :textFontSize="16"
            :ranges="ranges" :range="range" :selectedField="selectedField" @selectField="selectField"
            @insertField="insertField(index, $event)" />
    </div>
</template>
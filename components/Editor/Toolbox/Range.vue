<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    range: GlitchShadowField[],
    selectedField: GlitchShadowField | undefined
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
    addField: [field: GlitchShadowField]
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

function addField(e: Event) {
    const field: GlitchShadowField = {
        range: props.range[0].range,
        index: props.range.length,
        offsetFrame: props.range[props.range.length - 1].offsetFrame + 1,
        properties: {
            [GlitchAnimationProperty.TextShadow]: {
                enabled: false,
                fillAllFrames: false,
                color: {
                    hex: "#000000",
                    alphaPercent: 100
                },
                blur: 0,
                offsetX: 0,
                offsetY: 0
            },
            [GlitchAnimationProperty.BoxShadow]: {
                enabled: false,
                fillAllFrames: false,
                color: {
                    hex: "#000000",
                    alphaPercent: 100
                },
                blur: 0,
                offsetX: 0,
                offsetY: 0,
                spread: 0
            },
        }
    };
    emit('addField', field)
}
</script>

<template>
    <div class="relative bg-blue-400 mb-4 h-[20px]">
        <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
        :data-index="getDataIndex(field.offsetFrame, range[index + 1]?.offsetFrame)"
        :field="field" :isSelected="isFieldSelected(field)"
        :width="getPercentWidth(field.offsetFrame, range[index + 1]?.offsetFrame)"
        @selectField="selectField" />
        <UiButton class="absolute top-0 h-full" variant="icon" size="icon" @click="addField">+</UiButton>
    </div>
</template>

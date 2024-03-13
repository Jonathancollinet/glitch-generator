<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';
import { addFieldAtOffset } from '~/utils/Editor/utils';

const props = defineProps<{
    title?: string,
    ranges?: GlitchShadowField[][],
}>();

const ranges = ref<GlitchShadowField[][]>(props.ranges || [
    [
        {
            range: 0,
            index: 0,
            offsetFrame: 0,
            properties: {
                [GlitchAnimationProperty.TextShadow]: {
                    enabled: true,
                    fillAllFrames: true,
                    color: {
                        hex: "#F45B69",
                        alphaPercent: 100
                    },
                    blur: 0,
                    offsetX: 50,
                    offsetY: 25
                },
                [GlitchAnimationProperty.BoxShadow]: {
                    enabled: false,
                    fillAllFrames: true,
                    color: {
                        hex: "#724cf9",
                        alphaPercent: 100
                    },
                    blur: 0,
                    offsetX: 0,
                    offsetY: 0,
                    spread: 0
                },
            }
        },
        {
            range: 0,
            index: 1,
            offsetFrame: 50,
            properties: {
                [GlitchAnimationProperty.TextShadow]: {
                    enabled: true,
                    fillAllFrames: true,
                    color: {
                        hex: "#724cf9",
                        alphaPercent: 100
                    },
                    blur: 0,
                    offsetX: 75,
                    offsetY: 50
                },
                [GlitchAnimationProperty.BoxShadow]: {
                    enabled: false,
                    fillAllFrames: true,
                    color: {
                        hex: "#724cf9",
                        alphaPercent: 100
                    },
                    blur: 0,
                    offsetX: 0,
                    offsetY: 0,
                    spread: 0
                },
            }
        }
    ]
]);

const selectedField = ref<GlitchShadowField>();

function selectField(field: GlitchShadowField) {
    selectedField.value = field;
}

function insertField(rangeIndex: number, offset: number) {
    const range = ranges.value[rangeIndex];

    addFieldAtOffset(range, rangeIndex, offset)
}
</script>

<template>
    <div>
        <UiText as="div" data-color="black" v-if="title">{{ $t(title) }}</UiText>
        <EditorToolboxRange noProperties v-for="(range, index) in ranges" :key="`${index}-${range.length}`" :textFontSize="16"
            :ranges="ranges" :range="range" :selectedField="selectedField" @selectField="selectField"
            @insertField="insertField(index, $event)" />
    </div>
</template>
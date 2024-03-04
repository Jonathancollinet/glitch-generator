<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';
import { getPossibleOffsetFrames } from '~/utils/Toobox/utils';

const props = defineProps<{
    textFontSize: number,
    ranges: GlitchShadowField[][],
    range: GlitchShadowField[],
    selectedField?: GlitchShadowField
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

let oldX = 0;
let isDragging = false;
let currentField: GlitchShadowField | undefined;
let nextCurrentField: GlitchShadowField | undefined;
let jump = 0;
let jumpResize = 4;
let fieldToResize: GlitchShadowField | undefined;
let possibilities: number[] | undefined;

const hoveredField = ref<GlitchShadowField>();
const fieldPropertiesToShow = ref<GlitchShadowField>();
const draggingFieldIndex = ref(-1);

function changeFieldOffset(modifier: number) {
    if (jump >= jumpResize) {
        jump = 0;

        if (fieldToResize && possibilities) {
            if (possibilities.includes(fieldToResize.offsetFrame + modifier)) {
                fieldToResize.offsetFrame += modifier;
            }
        }
    }
}

function drag(e: DragEvent) {
    if (isDragging) {

        if (e.screenX && e.screenY) {
            if (e.pageX < oldX) {
                ++jump;
                changeFieldOffset(-1);
            } else if (e.pageX > oldX) {
                ++jump;
                changeFieldOffset(1);
            }

            saveX(e, e.pageX);
        }
    }
}

function hideGhost(e: DragEvent) {
    if (e instanceof DragEvent) {
        e.dataTransfer?.setDragImage(new Image(), 0, 0);
    }
}

function dragStart(e: DragEvent, field: GlitchShadowField) {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    hideGhost(e);
    draggingFieldIndex.value = field.index;
    isDragging = true;
    currentField = props.range[field.index];
    nextCurrentField = props.range[field.index + 1];

    if (field.index === 0) {
        fieldToResize = nextCurrentField;
    } else {
        if (e.offsetX < rect.width / 2) {
            fieldToResize = currentField;
        } else {
            fieldToResize = nextCurrentField || currentField;
        }
    }

    possibilities = fieldToResize && getPossibleOffsetFrames(fieldToResize, props.range);
}

function dragEnd(e: DragEvent) {
    saveX(e);
    nextCurrentField = undefined;
    fieldToResize = undefined;
    possibilities = undefined;
    draggingFieldIndex.value = -1;
    isDragging = false;
    currentField = undefined;

    props.ranges[props.range[0].range] = props.range;
}

function saveX(e: DragEvent, x?: number) {
    oldX = x ?? e.pageX;
}

function displayProperties(field: GlitchShadowField) {
    hoveredField.value = field;
}

function removeProperties() {
    hoveredField.value = undefined;
}

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

function isFieldSelected(field: GlitchShadowField) {
    return !!props.selectedField && props.selectedField.range === field.range
        && props.selectedField.index === field.index;
}

const showProperties = computed(() => {
    return hoveredField.value;
})

const propertyPosition = computed(() => {

    if (hoveredField.value) {
        if (draggingFieldIndex.value !== -1) {
            fieldPropertiesToShow.value = props.range[draggingFieldIndex.value];
        } else {
            fieldPropertiesToShow.value = hoveredField.value;
        }

        const field = fieldPropertiesToShow.value;
        const currentOffset = field.offsetFrame;
        const middleOffset = ((props.range[field.index + 1]?.offsetFrame ?? 101) - currentOffset) / 2;
        const left = currentOffset + middleOffset;

        return {
            left: `${left}%`,
        }
    }
})

const nextHoveredFrameOffset = computed(() => {
    if (fieldPropertiesToShow.value) {
        return (props.range[fieldPropertiesToShow.value.index + 1]?.offsetFrame ?? 100);
    }

    return 100;
})
</script>

<template>
    <div class="z-10 relative bg-neutral-50 mb-4 h-[24px] last:mb-0" @mouseout="removeProperties">
        <div class="h-full w-[calc(100%-36px)]">
            <UiTooltipContent v-show="showProperties" class="whitespace-nowrap -translate-x-1/2 -translate-y-full"
                :style="propertyPosition">
                <EditorToolboxFieldProperties :field="fieldPropertiesToShow"
                    :nextHoveredFrameOffset="nextHoveredFrameOffset" />
            </UiTooltipContent>
            <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" :textFontSize="textFontSize"
                :field="field" :nextField="range[index + 1]" @drag="drag" :draggingFieldIndex="draggingFieldIndex"
                :isSelected="isFieldSelected(field)" @displayProperties="displayProperties" @dragStart="dragStart"
                @dragEnd="dragEnd" @selectField="selectField" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';
import { getPossibleOffsetFrames } from '~/utils/Toobox/utils';

const props = defineProps<{
    textFontSize: number,
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
let jumpSize = 2;
let hoveredField = ref<GlitchShadowField>();
const fieldPropertiesToShow = ref<GlitchShadowField>();

const draggingFieldIndex = ref(-1);

function changeFieldOffset(modifier: number) {
    if (jump === jumpSize * modifier) {
        jump = 0;

        if (nextCurrentField) {
            const possibilities = getPossibleOffsetFrames(nextCurrentField, props.range);

            if (possibilities.includes(nextCurrentField.offsetFrame + modifier)) {
                nextCurrentField.offsetFrame += modifier;
            }
        } else {
            if (currentField) {
                const possibilities = getPossibleOffsetFrames(currentField, props.range);

                if (possibilities.includes(currentField.offsetFrame + modifier)) {
                    currentField.offsetFrame += modifier;
                }
            }
        }
    }
}

function drag(e: DragEvent) {
    if (isDragging) {
        const target = e.target as HTMLElement;

        if (target) {
            if (e.pageX < oldX) {
                if (jump > 0) {
                    jump = 0;
                }
                --jump;
                changeFieldOffset(-1);
            } else if (e.pageX > oldX) {
                if (jump < 0) {
                    jump = 0;
                }
                ++jump;
                changeFieldOffset(1);
            }
            saveX(e, e.pageX);
        }
    }
}

function hideGhost(e: DragEvent) {
    oldX = e.pageX;
    if (e instanceof DragEvent) {
        e.dataTransfer?.setDragImage(new Image(), 0, 0);
    }
}

function dragStart(e: DragEvent, field: GlitchShadowField) {
    hideGhost(e);
    draggingFieldIndex.value = field.index;
    isDragging = true;
    currentField = field;
    nextCurrentField = props.range[field.index + 1];
}

function dragEnd(e: DragEvent) {
    saveX(e);
    draggingFieldIndex.value = -1;
    isDragging = false;
    currentField = undefined;
    nextCurrentField = undefined;
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
})
</script>

<template>
    <div class="z-10 relative bg-neutral-50 mb-4 h-[24px] last:mb-0" @drag="drag" @mouseout="removeProperties">
        <div class="absolute whitespace-nowrap z-50 top-0 -translate-x-1/2 -translate-y-full bg-primary-50 border-2 rounded-xl border-primary-500 p-2"
            v-if="showProperties" :style="propertyPosition">
            {{ fieldPropertiesToShow?.offsetFrame }}% -> {{ nextHoveredFrameOffset }}%
        </div>
        <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
            :textFontSize="textFontSize" :field="field" :nextField="range[index + 1]"
            :draggingFieldIndex="draggingFieldIndex" :isSelected="isFieldSelected(field)"
            @displayProperties="displayProperties" @dragStart="dragStart" @dragEnd="dragEnd" @selectField="selectField" />
    </div>
</template>

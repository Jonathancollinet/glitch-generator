<script lang="ts" setup>
import type { GlitchShadowField } from '~/glitch/types';
import { getPossibleOffsetFrames } from '~/utils/Toobox/utils';
import { rangeHeight } from '~/utils/constants';

const props = defineProps<{
    textFontSize: number,
    ranges: GlitchShadowField[][],
    range: GlitchShadowField[],
    selectedField?: GlitchShadowField,
    noProperties?: boolean
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    selectField: [field: GlitchShadowField],
    insertField: [offset: number]
}>()

let oldX = 0;
let isDragging = false;
let currentField: GlitchShadowField | undefined;
let nextCurrentField: GlitchShadowField | undefined;
let jump = 0;
let jumpResize = 4;
let fieldToResize: GlitchShadowField | undefined;
let possibilities: number[] | undefined;
let percents = new Array(101).fill(0).map((_, i) => i);

const hoveredField = ref<GlitchShadowField>();
const fieldPropertiesToShow = ref<GlitchShadowField>();
const draggingFieldIndex = ref(-1);
const displaySelectableFields = ref(false);
const translationModifier = ref('');

const onField = {
    updateField,
    dragStart,
    dragEnd,
    displayProperties,
    drag,
    selectField
}

function showSelectableField(e: MouseEvent) {
    displaySelectableFields.value = true;
}

function hideSelectableField() {
    displaySelectableFields.value = false;
}

function chooseFieldOffset(e: MouseEvent, offset: number) {
    hideSelectableField();
    emit('insertField', offset);
}

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

function updateField(field: GlitchShadowField) {
    emit('updateField', field);
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
}

function saveX(e: DragEvent, x?: number) {
    oldX = x ?? e.pageX;
}

function displayProperties(e: MouseEvent, field: GlitchShadowField) {
    const target = e.target as HTMLElement;
    const middle = target.scrollWidth / 2 + 16;
    const left = target.offsetLeft;
    const arbitraryTooltipSize = 180 / 2;

    if ((document.body.scrollWidth - 16 - left) < arbitraryTooltipSize) {
        translationModifier.value = '-100%';
    } else if ((middle + left) > arbitraryTooltipSize) {
        translationModifier.value = '';
    } else {
        translationModifier.value = '0%';
    }

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
    return !props.noProperties && hoveredField.value;
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
        const finalTranslateX = translationModifier.value ? translationModifier.value : '-50%';

        return {
            left: `${left}%`,
            transform: `translate(${finalTranslateX}, calc(-100% - 5px))`
        }
    }
})

const nextHoveredFrameOffset = computed(() => {
    if (fieldPropertiesToShow.value) {
        return (props.range[fieldPropertiesToShow.value.index + 1]?.offsetFrame ?? 101);
    }

    return 100;
})
</script>

<template>
    <div class="relative mb-2 last:mb-0" :style="{height: rangeHeight + 'px'}" @mouseleave="removeProperties" v-click-outside="hideSelectableField">
        <div class="h-full w-[calc(100%-36px)]">
            <UiTooltipContent v-show="showProperties" class="whitespace-nowrap" :style="propertyPosition">
                <EditorToolboxFieldProperties :field="fieldPropertiesToShow"
                    :nextHoveredFrameOffset="nextHoveredFrameOffset" />
            </UiTooltipContent>
            <div>
                <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" :textFontSize="textFontSize"
                    :field="field" :nextField="range[index + 1]" :draggingFieldIndex="draggingFieldIndex"
                    :isSelected="isFieldSelected(field)" v-on="onField" @contextmenu.prevent.stop
                    @mousedown.right="showSelectableField" />
            </div>
            <div v-if="displaySelectableFields" class="absolute z-10 h-full w-full whitespace-nowrap">
                <div class="inline-block w-[1%] h-full bg-primary-50 opacity-0 border-l border-transparent hover:opacity-50"
                    :style="{ left: p + '%' }" @contextmenu.prevent.stop @mouseup.right="chooseFieldOffset($event, p)"
                    v-for="(p, index) in percents" />
            </div>
        </div>
    </div>
</template>
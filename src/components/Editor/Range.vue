<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { getPossibleOffsetFrames } from "~/lib/toolbox/utils";
import { rangeHeight } from "~/utils/constants";

const props = defineProps<{
    config?: G.Config;
    range: G.Field[];
    selectedField?: G.Field;
    noProperties?: boolean;
}>();

const emit = defineEmits<{
    updateField: [field: G.Field];
    selectField: [field: G.Field];
    insertField: [offset: number];
}>();

let oldX = 0;
let isDragging = false;
let currentField: G.Field | undefined;
let nextCurrentField: G.Field | undefined;
let jump = 0;
let jumpResize = 4;
let fieldToResize: G.Field | undefined;
let possibilities: number[] | undefined;
const percents = new Array(101).fill(0).map((_, i) => i);

const hoveredField = ref<G.Field>();
const draggingFieldIndex = ref(-1);
const displaySelectableFields = ref(false);
const translationModifier = ref("");

const onField = {
    updateField,
    dragStart,
    dragEnd,
    displayProperties,
    drag,
    selectField,
};

function showSelectableField() {
    displaySelectableFields.value = true;
}

function hideSelectableField() {
    displaySelectableFields.value = false;
}

function chooseFieldOffset(e: MouseEvent, offset: number) {
    hideSelectableField();
    emit("insertField", offset);
}

function updateField(field: G.Field) {
    emit("updateField", field);
}

function selectField(field: G.Field) {
    emit("selectField", field);
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

function dragStart(e: DragEvent, field: G.Field) {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    jumpResize = (target.parentElement?.offsetWidth || 100) / 100;

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

    possibilities =
        fieldToResize && getPossibleOffsetFrames(fieldToResize, props.range);
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

function displayProperties(e: MouseEvent, field: G.Field) {
    const target = e.target as HTMLElement;
    const middle = target.scrollWidth / 2 + 16;
    const left = target.offsetLeft;
    const arbitraryTooltipSize = 150 / 2;

    if (document.body.scrollWidth - 16 - left < arbitraryTooltipSize) {
        translationModifier.value = "-100%";
    } else if (middle + left > arbitraryTooltipSize) {
        translationModifier.value = "";
    } else {
        translationModifier.value = "0%";
    }

    hoveredField.value = field;
}

function removeProperties() {
    hoveredField.value = undefined;
}

function isFieldSelected(field: G.Field) {
    return (
        !!props.selectedField &&
        props.selectedField.range === field.range &&
        props.selectedField.index === field.index
    );
}

const textFontSize = computed(() => {
    return props.config?.text.size || 16;
});

const showProperties = computed(() => {
    return !props.noProperties && hoveredField.value;
});

const fieldPropertiesToShow = computed(() => {
    if (draggingFieldIndex.value !== -1) {
        return props.range[draggingFieldIndex.value];
    } else {
        return hoveredField.value;
    }
});

const propertyPosition = computed(() => {
    if (hoveredField.value && fieldPropertiesToShow.value) {
        const field = fieldPropertiesToShow.value;
        const currentOffset = field.offsetFrame;
        const middleOffset =
            ((props.range[field.index + 1]?.offsetFrame ?? 101) -
                currentOffset) /
            2;
        const left = currentOffset + middleOffset;
        const finalTranslateX = translationModifier.value
            ? translationModifier.value
            : "-50%";

        return {
            left: `${left}%`,
            transform: `translate(${finalTranslateX}, calc(-100% - 5px))`,
        };
    }
});

const nextHoveredFrameOffset = computed(() => {
    if (fieldPropertiesToShow.value) {
        return (
            props.range[fieldPropertiesToShow.value.index + 1]?.offsetFrame ??
            101
        );
    }

    return 100;
});
</script>

<template>
    <div
        v-click-outside="hideSelectableField"
        class="relative mb-2 select-none last:mb-0"
        :style="{ height: rangeHeight + 'px' }"
    >
        <div class="h-full w-[calc(100%-36px)]">
            <UiTooltipContent
                v-show="showProperties"
                class="whitespace-nowrap"
                :style="propertyPosition"
            >
                <EditorFieldProperties
                    :field="fieldPropertiesToShow"
                    :next-hovered-frame-offset="nextHoveredFrameOffset"
                />
            </UiTooltipContent>
            <div>
                <EditorFieldSelectable
                    v-for="(field, index) in range"
                    :key="index"
                    :text-font-size="textFontSize"
                    :field="field"
                    :next-field="range[index + 1]"
                    :dragging-field-index="draggingFieldIndex"
                    :is-selected="isFieldSelected(field)"
                    v-on="onField"
                    @contextmenu.prevent.stop
                    @mouseleave="removeProperties"
                    @mousedown.right="showSelectableField"
                />
            </div>
            <div
                v-if="displaySelectableFields"
                class="absolute z-10 h-full w-full whitespace-nowrap"
            >
                <div
                    v-for="(p, index) in percents"
                    :key="index"
                    class="inline-block h-full w-[1%] border-l border-transparent bg-primary-50 opacity-0 hover:opacity-50"
                    :style="{ left: p + '%' }"
                    @contextmenu.prevent.stop
                    @mouseup.right="chooseFieldOffset($event, p)"
                />
            </div>
        </div>
    </div>
</template>

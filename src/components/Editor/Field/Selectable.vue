<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import G from "~/lib/glitch/types";
import { Icons } from "~/types/enums";

type StyleAttrs = { background?: string; filter?: string };
type Style = { [key in G.PropertyName]: StyleAttrs };

const props = withDefaults(
    defineProps<{
        textFontSize: number;
        field: G.Field;
        nextField?: G.Field;
        isSelected: boolean;
        width?: string;
        draggingFieldIndex: number;
    }>(),
    {
        width: "100%",
        nextField: undefined,
    },
);

const emit = defineEmits<{
    updateField: [field: G.Field];
    selectField: [field: G.Field];
    dragStart: [e: DragEvent, field: G.Field];
    dragEnd: [e: DragEvent];
    displayProperties: [e: MouseEvent, field: G.Field];
}>();

function getPercentWidth() {
    const length = (props.nextField?.offsetFrame ?? 101) - props.field.offsetFrame;

    return length + "%";
}

function getColorFor(property: G.Shadow, nextProperty?: G.Shadow) {
    const nextOffsetFrame = props.nextField?.offsetFrame;
    const color = property.color;
    const nextColor = nextProperty?.color;
    const rgb = hexToRGB(color.hex, color.alphaPercent);

    if (nextColor && nextOffsetFrame) {
        const nextRgb = hexToRGB(nextColor.hex, nextColor.alphaPercent);

        if (!property.fillAllFrames) {
            return `linear-gradient(to right, ${rgb}, ${nextRgb})`;
        }

        const lastColorPercent = 100 - 100 / (nextOffsetFrame - props.field.offsetFrame);

        return `linear-gradient(to right, ${rgb} ${lastColorPercent}%, ${nextRgb})`;
    }

    return rgb;
}

function getAttrs(s: StyleAttrs, property: G.Shadow, blurModifier: number, nextProperty?: G.Shadow) {
    if (nextProperty?.enabled) {
        s.background = getColorFor(property, nextProperty);
    } else {
        s.background = getColorFor(property);
    }

    if (property.blur > 0) {
        s.filter = `blur(${(property.blur / props.textFontSize) * blurModifier}px)`;
    }
}

function getStyle() {
    const style: Style = {
        [G.PropertyName.TextShadow]: {},
        [G.PropertyName.BoxShadow]: {},
    };
    const shadows = props.field.shadows;
    const nextProperties = props.nextField?.shadows;
    const textShadow = shadows[G.PropertyName.TextShadow];
    const boxShadow = shadows[G.PropertyName.BoxShadow];
    const nextTextShadow = nextProperties?.[G.PropertyName.TextShadow];
    const nextBoxShadow = nextProperties?.[G.PropertyName.BoxShadow];
    const textShadowEnabled = textShadow?.enabled;
    const boxShadowEnabled = boxShadow?.enabled;

    if (textShadowEnabled) {
        getAttrs(style[G.PropertyName.TextShadow], textShadow, 16, nextTextShadow);
    }

    if (boxShadowEnabled) {
        getAttrs(style[G.PropertyName.BoxShadow], boxShadow, 8, nextBoxShadow);
    }

    return style;
}

function selectField() {
    emit("selectField", props.field);
}

function dragStart(e: DragEvent) {
    emit("dragStart", e, props.field);
}

function dragEnd(e: DragEvent) {
    emit("dragEnd", e);
}

function displayProperties(e: MouseEvent) {
    emit("displayProperties", e, props.field);
}

const textShadowStyle = computed(() => getStyle()[G.PropertyName.TextShadow]);
const boxShadowStyle = computed(() => getStyle()[G.PropertyName.BoxShadow]);
const textShadowEnabled = computed(() => props.field.shadows[G.PropertyName.TextShadow]?.enabled);

const hasShadowBox = computed(() => {
    return props.field.shadows[G.PropertyName.BoxShadow]?.enabled;
});

const fieldStyle = computed(() => {
    return {
        height: "100%",
        width: getPercentWidth(),
        left: `${props.field.offsetFrame}%`,
    };
});

const fieldClass = computed(() => {
    const isDragging = props.draggingFieldIndex !== -1;
    const draggingOther = props.draggingFieldIndex !== props.field.index;

    const classes: ClassValue[] = [
        "absolute overflow-hidden h-full cursor-pointer select-none inline-block",
        "hover:opacity-50",
        "border border-l-0",
        "first:border-l",
        isDragging && "active:cursor-grabbing",
        props.isSelected ? "first:border-4 border-4 !hover:opacity-90" : "",
    ];

    if (isDragging) {
        if (draggingOther) {
            classes.push("hover:opacity-100");
        } else {
            classes.push("opacity-50");
        }
    }

    return classes;
});

watch(
    () => props.field.offsetFrame,
    () => {
        emit("updateField", props.field);
    },
    { deep: true },
);
</script>

<template>
    <div
        :draggable="true"
        :class="cn(fieldClass, $attrs.class ?? '')"
        :style="fieldStyle"
        @mouseenter="displayProperties"
        @dragstart="dragStart"
        @dragend="dragEnd"
        @click="selectField"
    >
        <div :class="`w-full overflow-hidden`" :style="{ height: hasShadowBox ? '70%' : '100%' }">
            <div class="flex h-full items-center justify-center" :style="{ ...textShadowStyle }">
                <UiIcon v-if="!textShadowEnabled" class="max-w-[12px]" :icon="Icons.EyeSlash" />
            </div>
        </div>
        <div v-if="hasShadowBox" class="h-[30%] w-full overflow-hidden border-t-2">
            <div class="h-full" :style="{ ...boxShadowStyle }" />
        </div>
    </div>
</template>

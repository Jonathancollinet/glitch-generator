<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { GlitchAnimationProperty } from '~/glitch/types';
import type { GlitchShadowField, GlitchShadowProperty } from '~/glitch/types';

type StyleAttrs = { background?: string, filter?: string };
type Style = { [key in GlitchAnimationProperty]: StyleAttrs };

const props = withDefaults(defineProps<{
    textFontSize: number,
    field: GlitchShadowField,
    nextField?: GlitchShadowField,
    isSelected: boolean,
    width?: string,
    draggingFieldIndex: number
}>(), {
    width: '100%'
})

const emit = defineEmits<{
    selectField: [field: GlitchShadowField],
    dragStart: [e: DragEvent, field: GlitchShadowField],
    dragEnd: [e: DragEvent],
    displayProperties: [field: GlitchShadowField]
}>()

function getPercentWidth() {
    const length = ((props.nextField?.offsetFrame ?? 101) - props.field.offsetFrame);

    return length + '%'
}

function getColorFor(property: GlitchShadowProperty, nextProperty?: GlitchShadowProperty, filter?: boolean) {
    const nextOffsetFrame = props.nextField?.offsetFrame;
    const color = property.color;
    const nextColor = nextProperty?.color;
    const rgb = hexToRGB(color.hex, color.alphaPercent)

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

function getAttrs(s: StyleAttrs, shadow: GlitchShadowProperty, blurModifier: number, nextShadow?: GlitchShadowProperty) {
    if (nextShadow?.enabled) {
        s.background = getColorFor(shadow, nextShadow, false);
    } else {
        s.background = getColorFor(shadow, undefined, false);
    }

    if (shadow.blur > 0) {
        s.filter = `blur(${shadow.blur / props.textFontSize * blurModifier}px)`;
    }
}

function getStyle() {
    const style: Style = {
        [GlitchAnimationProperty.TextShadow]: {},
        [GlitchAnimationProperty.BoxShadow]: {}
    }
    const field = props.field;
    const textShadow = field.properties[GlitchAnimationProperty.TextShadow];
    const boxShadow = field.properties[GlitchAnimationProperty.BoxShadow];
    const nextTextShadow = props.nextField?.properties[GlitchAnimationProperty.TextShadow];
    const nextBoxShadow = props.nextField?.properties[GlitchAnimationProperty.BoxShadow];
    const textShadowEnabled = textShadow?.enabled;
    const boxShadowEnabled = boxShadow?.enabled;

    if (textShadowEnabled) {
        getAttrs(style[GlitchAnimationProperty.TextShadow], textShadow, 16, nextTextShadow);
    }

    if (boxShadowEnabled) {
        getAttrs(style[GlitchAnimationProperty.BoxShadow], boxShadow, 8, nextBoxShadow);
    }

    return style;
}


function selectField() {
    emit('selectField', props.field);
}

function dragStart(e: DragEvent) {
    emit('dragStart', e, props.field);
}

function dragEnd(e: DragEvent) {
    emit('dragEnd', e);
}

function displayProperties() {
    emit('displayProperties', props.field);
}

const textShadowStyle = computed(() => getStyle()[GlitchAnimationProperty.TextShadow]);
const boxShadowStyle = computed(() => getStyle()[GlitchAnimationProperty.BoxShadow]);

const hasShadowBox = computed(() => {
    return props.field.properties[GlitchAnimationProperty.BoxShadow]?.enabled;
});

const fieldStyle = computed(() => {
    return {
        width: getPercentWidth(),
        left: `${props.field.offsetFrame}%`
    }
});

const fieldClass = computed(() => {
    const isDragging = props.draggingFieldIndex !== -1;
    const draggingOther = props.draggingFieldIndex !== props.field.index;

    const classes: ClassValue[] = [
        'absolute overflow-hidden h-full cursor-pointer select-none inline-block border-l border-transparent',
        'hover:bg-primary-50 hover:opacity-50',
        'first:border-l-0',
        props.isSelected ? ' border border-l-2' : '',

    ]

    if (isDragging) {
        if (draggingOther) {
            classes.push('hover:opacity-100');
        } else {
            classes.push('opacity-50');
        }
    }

    return classes;
});
</script>

<template>
    <div :draggable="true" @mouseover="displayProperties" @dragstart="dragStart" @dragend="dragEnd"
        :class="cn(fieldClass, $attrs.class ?? '')" @click="selectField" @mousedown="selectField" :style="fieldStyle">
        <div :class="`w-full overflow-hidden`" :style="{ height: hasShadowBox ? '70%' : '100%' }">
            <div class="h-full" :style="{ ...textShadowStyle }" />
        </div>
        <div class="h-[30%] w-full border-t-2 border-t-neutral-50 overflow-hidden">
            <div class="h-full" v-if="hasShadowBox" :style="{ ...boxShadowStyle }" />
        </div>
    </div>
</template>
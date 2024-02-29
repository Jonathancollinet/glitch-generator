<script lang="ts" setup>
import { GlitchAnimationProperty } from '~/glitch/types';
import type { GlitchShadowField, GlitchShadowProperty } from '~/glitch/types';

type StyleAttrs = { background?: string, filter?: string };
type Style = { [key in GlitchAnimationProperty]: StyleAttrs };

const props = withDefaults(defineProps<{
    field: GlitchShadowField,
    nextField?: GlitchShadowField,
    isSelected: boolean,
    width?: string
}>(), {
    width: '100%'
})

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

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

function getAtts(s: StyleAttrs, shadow: GlitchShadowProperty, nextShadow?: GlitchShadowProperty) {
    s.background = getColorFor(shadow, nextShadow, false);

    if (shadow.blur > 0) {
        // s.filter = `blur(${shadow.blur}px)`;
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
    const textShadowEnabled = textShadow.enabled;
    const boxShadowEnabled = boxShadow.enabled;

    if (textShadowEnabled) {
        getAtts(style[GlitchAnimationProperty.TextShadow], textShadow, nextTextShadow);
    }
    
    if (boxShadowEnabled) {
        getAtts(style[GlitchAnimationProperty.BoxShadow], boxShadow, nextBoxShadow);
    }

    return style;
}

const textShadowStyle = computed(() => getStyle()[GlitchAnimationProperty.TextShadow]);
const boxShadowStyle = computed(() => getStyle()[GlitchAnimationProperty.BoxShadow]);

const hasShadowBox = computed(() => {
    return props.field.properties[GlitchAnimationProperty.BoxShadow].enabled;
})

function selectField() {
    emit('selectField', props.field);
}
</script>

<template>
    <div :class="'absolute overflow-hidden h-full cursor-pointer select-none inline-block border-l border-transparent hover:mix-blend-luminosity hover:opacity-50' + (isSelected ? ' border border-l-2 hover:opacity-100' : '')"
        @click="selectField" :style="{ width, left: `${field.offsetFrame}%` }">
        <div :class="`w-full`" :style="{ height: hasShadowBox ? '70%' : '100%', ...textShadowStyle }" />
        <div v-if="hasShadowBox" class="h-[30%] w-full" :style="{  ...boxShadowStyle }" />
    </div>
</template>
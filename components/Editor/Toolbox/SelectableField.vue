<script lang="ts" setup>
import { GlitchAnimationProperty } from '~/glitch/types';
import type { GlitchShadowField, GlitchShadowProperty } from '~/glitch/types';

const props = withDefaults(defineProps<{
    field: GlitchShadowField,
    nextField?: GlitchShadowField,
    isSelected: boolean,
    width?: string
}>(), {
    width: '100%'
})

const emit = defineEmits([
    'selectField'
])

function getColorFor(property: GlitchShadowProperty, nextProperty?: GlitchShadowProperty) {
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

function getBackground() {
    const field = props.field;
    const textShadow = field.properties[GlitchAnimationProperty.TextShadow];
    const boxShadow = field.properties[GlitchAnimationProperty.BoxShadow];
    const textShadowEnabled = textShadow.enabled;
    const boxShadowEnabled = boxShadow.enabled;

    if (textShadowEnabled) {
        return getColorFor(textShadow, props.nextField?.properties[GlitchAnimationProperty.TextShadow]);
    } else if (boxShadowEnabled) {
        return getColorFor(boxShadow, props.nextField?.properties[GlitchAnimationProperty.BoxShadow]);
    }
    return '';
}

function selectField() {
    emit('selectField', props.field);
}
</script>

<template>
    <div :class="'relative z-20 h-full cursor-pointer select-none inline-flex border-l [&.border-l-transparent+.border-l-neutral-800]:border-l-transparent first:border-l-0 ' + (isSelected ? 'bg-blue-50 opacity-20 border-l-transparent' : 'border-l-neutral-800')"
        @click="selectField" :style="{ width, background: getBackground() }">
    </div>
</template>
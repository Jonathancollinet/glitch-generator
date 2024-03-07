<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    field: GlitchShadowField | undefined,
    nextHoveredFrameOffset: number,
}>()

const textShadow = computed(() => {
    return props.field?.properties?.[GlitchAnimationProperty.TextShadow];
})
const boxShadow = computed(() => {
    return props.field?.properties?.[GlitchAnimationProperty.BoxShadow];
})

const formatTextShadow = computed(() => {
    const shadow = textShadow.value;
    if (shadow) {
        return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px`;
    }
})

const formatBoxShadow = computed(() => {
    const shadow = boxShadow.value;
    if (shadow) {
        return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px`;
    }
})
</script>

<template>
  <div v-if="field">
    <div class="mb-2">
        <template v-if="field.offsetFrame !== nextHoveredFrameOffset">
            {{ field.offsetFrame }}->{{ nextHoveredFrameOffset }}%
        </template>
        <template v-else>
            {{ field.offsetFrame }}%
        </template>
    </div>
    <div class="text-xs mb-1" v-if="textShadow?.enabled">
        <div class="flex">
            <div>"text-shadow":</div>
            <div class="ml-1">
                <template v-if="!textShadow.fillAllFrames">
                    {{ field.offsetFrame }}%
                </template>
                <template v-else>all</template>
            </div>
        </div>
        <div class="flex pl-1">{{ formatTextShadow }}<div class="ml-1 h-3 w-3" :style="{background: hexToRGB(textShadow.color.hex, textShadow.color.alphaPercent)}" /></div>
    </div>
    <div class="text-xs" v-if="boxShadow?.enabled">
        <div class="flex">
            <div>"box-shadow":</div>
            <div class="ml-1">
                <template v-if="!boxShadow.fillAllFrames">
                    {{ field.offsetFrame }}%
                </template>
                <template v-else>all</template>
            </div>
        </div>
        <div class="flex pl-1">{{ formatBoxShadow }}<div class="ml-1 h-3 w-3" :style="{background: hexToRGB(boxShadow.color.hex, boxShadow.color.alphaPercent)}" /></div>
    </div>
  </div>
</template>
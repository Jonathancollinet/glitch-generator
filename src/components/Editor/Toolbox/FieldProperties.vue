<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';

defineProps<{
    field: GlitchShadowField | undefined,
    nextHoveredFrameOffset: number,
}>();
</script>

<template>
    <div v-if="field" class="space-y-2">
        <div class="font-bold">
            <template v-if="field.offsetFrame !== nextHoveredFrameOffset">
                {{ field.offsetFrame }}->{{ nextHoveredFrameOffset }}%
            </template>
            <template v-else>
                {{ field.offsetFrame }}%
            </template>
        </div>
        <EditorToolboxFieldProperty :field="field" :propertyName="GlitchAnimationProperty.TextShadow" />
        <EditorToolboxFieldProperty :field="field" :propertyName="GlitchAnimationProperty.BoxShadow" />
    </div>
</template>
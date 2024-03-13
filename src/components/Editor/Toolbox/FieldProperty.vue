<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    field: GlitchShadowField,
    propertyName: GlitchAnimationProperty
}>();

const property = computed(() => {
    return props.field?.properties?.[props.propertyName];
});

const formatProperty = computed(() => {
    const shadow = property.value;

    if (shadow) {
        return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px`;
    }
});
</script>

<template>
    <div class="text-xs space-y-1" v-if="property?.enabled">
        <div class="flex">
            <div class="font-bold underline">"{{ propertyName }}":</div>
            <div class="ml-1 font-bold">
                <template v-if="!property.fillAllFrames">
                    {{ field.offsetFrame }}%
                </template>
                <template v-else>{{ $t('pages.editor.config.field.all') }}</template>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="h-4 w-4">
                <EditorToolboxColorDisplay :color="property.color" />
            </div>
            <div>{{ formatProperty }}</div>
        </div>
    </div>
</template>
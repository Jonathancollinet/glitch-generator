<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    range: GlitchShadowField[],
    selectedField?: GlitchShadowField
}>()

const emit = defineEmits<{
    selectField: [field: GlitchShadowField]
}>()

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

function isFieldSelected(field: GlitchShadowField) {
    return !!props.selectedField && props.selectedField.range === field.range
        && props.selectedField.index === field.index;
}

</script>

<template>
    <div class="overflow-hidden z-10 relative bg-neutral-50 mb-4 h-[24px] last:mb-0">
        <EditorToolboxSelectableField v-for="(field, index) in range" :key="index" v-model:config="range[index]"
            :field="field" :nextField="range[index + 1]" :isSelected="isFieldSelected(field)" @selectField="selectField" />
    </div>
</template>

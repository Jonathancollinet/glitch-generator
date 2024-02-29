<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import { GlitchAnimationProperty, type GlitchConfig, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    currentPercent: number
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    selectField: [field: GlitchShadowField],
    addField: [rangeIndex: number],
    addRange: []
}>()

const config = defineModel<GlitchConfig>('config', { required: true });
const selectedField = defineModel<GlitchShadowField>('field', { required: true });

const localConfig = ref<GlitchConfig>(deepCopy(config.value));
const localSelectedField = ref<GlitchShadowField>(deepCopy(selectedField.value));
const lastOpenedTab = ref<GlitchAnimationProperty>(GlitchAnimationProperty.TextShadow);

const currentIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : '';
})

function selectField(field: GlitchShadowField) {
    emit('selectField', field);
}

const roundedPercent = computed(() => {
    return props.currentPercent;
})

function addField(rangeIndex: number) {
    emit('addField', rangeIndex);
}

function addRange() {
    emit('addRange');
}

watch(selectedField, (field) => {
    if (field) {
        localSelectedField.value = deepCopy(field);
    }
})

watch(config.value.ranges, () => {
    if (selectedField.value) {
        emit('updateField', selectedField.value);
    }
}, { deep: true });

</script>

<template>
    <div>
        <EditorToolboxRanges :hasControls="config.controls" :currentPercent="roundedPercent" :ranges="config.ranges"
            :selectedField="selectedField" @selectField="selectField" @addRange="addRange" @addField="addField" />
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation"
            :errors="errors" />
        <EditorToolboxField v-if="selectedField && localSelectedField" :range="config.ranges[selectedField.range]"
            :errors="errors" :key="currentIndexes" v-model:openTab="lastOpenedTab" v-model:config="selectedField"
            v-model:localConfig="localSelectedField" />
    </div>
</template>

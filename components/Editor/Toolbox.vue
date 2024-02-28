<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import { GlitchAnimationProperty, type GlitchConfig, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
        currentPercent: number
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField]
}>()

const config = defineModel<GlitchConfig>({ required: true });
const localConfig = ref<GlitchConfig>(deepCopy(config.value));

const selectedField = ref<GlitchShadowField>();
const localSelectedField = ref<GlitchShadowField>();
const lastOpenedTab = ref<GlitchAnimationProperty>(GlitchAnimationProperty.TextShadow);

const currentIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : '';
})

function selectField(field: GlitchShadowField) {
    selectedField.value = field;
    localSelectedField.value = deepCopy(field);
}

const roundedPercent = computed(() => {
    return props.currentPercent;
})

watch(config.value.ranges, () => {
    console.log("ranges updated")
    if (selectedField.value) {
        emit('updateField', selectedField.value);
    }
}, { deep: true });

</script>

<template>
    <div>
        <EditorToolboxRanges :hasControls="config.controls" :currentPercent="roundedPercent" :ranges="config.ranges" :selectedField="selectedField" @selectField="selectField" />
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation"
            :errors="errors" />
        <EditorToolboxField v-if="selectedField && localSelectedField" :errors="errors" :key="currentIndexes"
            v-model:openTab="lastOpenedTab" v-model:config="selectedField" v-model:localConfig="localSelectedField" />
    </div>
</template>

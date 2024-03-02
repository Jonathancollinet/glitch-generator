<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import { GlitchAnimationProperty, type GlitchConfig, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    currentPercent: number
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    addField: [rangeIndex: number],
    addRange: []
}>()

const config = defineModel<GlitchConfig>('config', { required: true });
const selectedField = ref<GlitchShadowField>();

const localConfig = ref<GlitchConfig>(deepCopy(config.value));
const localSelectedField = ref<GlitchShadowField>();
const lastOpenedTab = ref<GlitchAnimationProperty>(GlitchAnimationProperty.TextShadow);

const currentIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : '';
})

function selectField(newField: GlitchShadowField) {
    selectedField.value = newField;
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
        <EditorToolboxRanges :textFontSize="config.text.size" :hasControls="config.controls" :currentPercent="roundedPercent" :ranges="config.ranges"
            :selectedField="selectedField" @selectField="selectField" @addRange="addRange" @addField="addField" />
        <EditorToolboxField v-if="selectedField && localSelectedField" :range="config.ranges[selectedField.range]"
            :errors="errors" :key="currentIndexes" v-model:openTab="lastOpenedTab" v-model:config="selectedField"
            v-model:localConfig="localSelectedField" />
        <UiCard>
            <template #title>
                <UiHeading variant="h3">{{ $t('pages.editor.config.text.title') }}</UiHeading>
            </template>
            <template #content>
                <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors">
                    <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation"
                    :errors="errors" />
                </EditorToolboxText>
            </template>
        </UiCard>
    </div>
</template>

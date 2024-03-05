<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import { type GlitchConfig, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
    currentPercent: number,
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField],
    addField: [rangeIndex: number],
    removeRange: [index: number],
    addEmptyRange: [],
    duplicateRange: [],
    removeField: [field: GlitchShadowField],
    closeField: []
}>()

const config = defineModel<GlitchConfig>('config', { required: true });
const selectedField = defineModel<GlitchShadowField | undefined>('field', { required: true });

const localConfig = ref<GlitchConfig>(deepCopy(config.value));
const localSelectedField = ref<GlitchShadowField>();

const currentIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : '';
})

function removeField(field: GlitchShadowField) {
    emit('removeField', field);
}

function closeField() {
    emit('closeField');
}

watch(selectedField, (field) => {
    if (field) {
        localSelectedField.value = deepCopy(field);
    }
})

watch(config.value.ranges, () => {
    if (selectedField.value) {
        const fieldRangeIndex = selectedField.value.range;
        const fieldIndex = selectedField.value.index;
        const field = config.value.ranges[fieldRangeIndex][fieldIndex];

        localSelectedField.value = deepCopy(field);
        emit('updateField', selectedField.value);
    }
}, { deep: true });

</script>

<template>
    <div>
        <div class="mb-4" v-if="selectedField && localSelectedField">
            <EditorToolboxField :range="config.ranges[selectedField.range]" :errors="errors" :key="currentIndexes"
                v-model:config="selectedField" v-model:localConfig="localSelectedField" @removeField="removeField"
                @closeField="closeField" />
        </div>
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation"
            :errors="errors" />
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
    </div>
</template>

<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import { type GlitchConfig, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
    currentPercent: number,
}>()

const emit = defineEmits<{
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
}, {deep: true})

</script>

<template>
    <div class="sm:flex sm:space-x-4 lg:block lg:space-x-0">
        <div class="mb-4" v-if="selectedField && localSelectedField">
            <EditorToolboxField data-v-step="7" :range="config.ranges[selectedField.range]" :errors="errors" :key="currentIndexes"
                v-model:config="selectedField" v-model:localConfig="localSelectedField" @removeField="removeField"
                @closeField="closeField" />
        </div>
        <EditorToolboxAnimation data-v-step="4" v-model:config="config.animation" v-model:localConfig="localConfig.animation"
            :errors="errors" />
        <EditorToolboxText data-v-step="3" v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
    </div>
</template>

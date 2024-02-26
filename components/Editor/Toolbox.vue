<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import type { GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>
}>()

const emit = defineEmits<{
    updateField: [field: GlitchShadowField]
}>()

const config = defineModel<GlitchConfig>({ required: true });
const localConfig = ref<GlitchConfig>(deepCopy(config.value));

const selectedField = ref<GlitchShadowField>();
const localSelectedField = ref<GlitchShadowField>();

function selectField(field: GlitchShadowField) {
    selectedField.value = deepCopy(field);
    localSelectedField.value = deepCopy(field);
}

function updateField(field: GlitchShadowField) {
    emit('updateField', field);
}

</script>

<template>
    <div>
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation" :errors="errors" />
        <EditorToolboxField v-if="selectedField && localSelectedField" v-model:config="selectedField" v-model:localConfig="localSelectedField" :errors="errors" @update="updateField" />
        <EditorToolboxRanges v-model:config="config.ranges" v-model:localConfig="localConfig.ranges" :errors="errors" :selectedField="selectedField"
            @selectField="selectField"/>
    </div>
</template>

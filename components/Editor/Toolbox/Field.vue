<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchErrors, type GlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>,
}>();

const emit = defineEmits(['update']);

const field = defineModel<GlitchShadowField>('config', { required: true });
const localField = defineModel<GlitchShadowField>('localConfig', { required: true });

const tabsConfig: Tabs = {
    [GlitchAnimationProperty.TextShadow]: {
        label: "pages.editor.config.field.textShadow",
    },
    [GlitchAnimationProperty.BoxShadow]: {
        label: "pages.editor.config.field.boxShadow",
    }
}

watch(field, () => {
    emit('update', field.value);
}, { deep: true });

</script>

<template>
    <UiTabs :tabs="tabsConfig">
        <template v-slot="slotProps">
            <EditorToolboxPropertyTextShadow v-if="slotProps.activeTab === GlitchAnimationProperty.TextShadow"
                v-model:config="field.properties[GlitchAnimationProperty.TextShadow]"
                v-model:localConfig="localField.properties[GlitchAnimationProperty.TextShadow]" :errors="errors" />
            <EditorToolboxPropertyBoxShadow v-else-if="slotProps.activeTab === GlitchAnimationProperty.BoxShadow"
                v-model:config="field.properties[GlitchAnimationProperty.BoxShadow]"
                v-model:localConfig="localField.properties[GlitchAnimationProperty.BoxShadow]" :errors="errors" />
        </template>
    </UiTabs>
</template>

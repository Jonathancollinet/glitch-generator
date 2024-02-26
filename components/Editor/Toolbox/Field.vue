<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchConfig, type GlitchErrors, type GlitchShadowField, type OptionnalGlitchShadowProperty, type OptionnalGlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    selectedFields: GlitchShadowField[],
    config: GlitchConfig,
    errors: Partial<GlitchErrors>,
}>();

const emit = defineEmits(['update']);

const defaultValue: OptionnalGlitchShadowProperty = {
    color: {
        hex: '',
        alphaPercent: 100
    }
}

const defaultFieldValue: OptionnalGlitchShadowField = {
    properties: {
        [GlitchAnimationProperty.TextShadow]: {
            ...deepCopy(defaultValue),
        },
        [GlitchAnimationProperty.BoxShadow]: {
            ...deepCopy(defaultValue),
            spread: 0
        }

    }
};

const data = ref<OptionnalGlitchShadowField>(deepCopy(defaultFieldValue));
const localData = ref<OptionnalGlitchShadowField>(deepCopy(defaultFieldValue));

function copyFieldWithCommons(field: OptionnalGlitchShadowField) {
    const copy = deepCopy(field);
    delete copy.index;
    delete copy.range;
    delete copy.offsetFrame;

    data.value = copy;
    localData.value = deepCopy(copy);
}

watch(props.selectedFields, (newVal) => {
    if (newVal.length === 1) {
        data.value = deepCopy(newVal[0]) as OptionnalGlitchShadowField;
        localData.value = deepCopy(newVal[0]) as OptionnalGlitchShadowField;
    } else {
        copyFieldWithCommons(defaultFieldValue);
    }
});

if (props.selectedFields.length === 1) {
    copyFieldWithCommons(props.selectedFields[0]);
}

const tabsConfig: Tabs = {
    [GlitchAnimationProperty.TextShadow]: {
        label: "pages.editor.config.field.textShadow",
    },
    [GlitchAnimationProperty.BoxShadow]: {
        label: "pages.editor.config.field.boxShadow",
    }
}

</script>

<template>
    <UiTabs :tabs="tabsConfig">
        <template v-slot="slotProps">
            <EditorToolboxPropertyTextShadow v-if="slotProps.activeTab === GlitchAnimationProperty.TextShadow"
                v-model:config="data.properties[GlitchAnimationProperty.TextShadow]"
                v-model:localConfig="localData.properties[GlitchAnimationProperty.TextShadow]" :errors="errors" />
            <EditorToolboxPropertyBoxShadow v-else-if="slotProps.activeTab === GlitchAnimationProperty.BoxShadow"
                v-model:config="data.properties[GlitchAnimationProperty.BoxShadow]"
                v-model:localConfig="localData.properties[GlitchAnimationProperty.BoxShadow]" :errors="errors" />
        </template>
    </UiTabs>
</template>

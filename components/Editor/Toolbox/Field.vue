<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchErrors, type GlitchShadowField, type GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getPossibleOffsetFrames } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    range: GlitchShadowField[],
}>();

const field = defineModel<GlitchShadowField>('config', { required: true });
const localField = defineModel<GlitchShadowField>('localConfig', { required: true });
const openTab = defineModel<GlitchAnimationProperty>('openTab', { required: true });
const defaultField = getDefaultField(0, 0, 0);
const defaultTextShadow = <GlitchShadowProperty>deepCopy(defaultField.properties[GlitchAnimationProperty.TextShadow]);
const defaultBoxShadow = <GlitchShadowProperty>deepCopy(defaultField.properties[GlitchAnimationProperty.BoxShadow]);

const textShadow = ref(field.value.properties[GlitchAnimationProperty.TextShadow] || defaultTextShadow);
const localTextShadow = ref(deepCopy(textShadow.value));
const boxShadow = ref(field.value.properties[GlitchAnimationProperty.BoxShadow] || defaultBoxShadow);
const localBoxShadow = ref(deepCopy(boxShadow.value));

const emit = defineEmits<{
    onSelectedTab: [tab: GlitchAnimationProperty]
}>();

const tabsConfig: Tabs = {
    [GlitchAnimationProperty.TextShadow]: {
        label: "pages.editor.config.field.textShadow",
    },
    [GlitchAnimationProperty.BoxShadow]: {
        label: "pages.editor.config.field.boxShadow",
    }
}

const updateOffsetFrame = applyUpdater<GlitchShadowField>({
    obj: field.value,
    localObj: localField.value,
    key: 'offsetFrame',
    modifier: Number
});
</script>

<template>
    <UiCard>
        <template #title>
            <UiFormGroup variant="inline" label="pages.editor.config.field.offsetFrame" name="offsetFrame">
                <select id="offsetFrame" name="offsetFrame" :value="localField.offsetFrame" @change="updateOffsetFrame">
                    <option v-for="frame in getPossibleOffsetFrames(field, range)" :key="frame" :value="frame">{{ frame }}</option>
                </select>
            </UiFormGroup>
        </template>
        <template #content>
            <UiTabs :tabs="tabsConfig" v-model="openTab">
                <template v-slot="slotProps">
                    <EditorToolboxPropertyTextShadow v-if="slotProps.activeTab === GlitchAnimationProperty.TextShadow"
                        v-model:config="textShadow"
                        v-model:localConfig="localTextShadow" :errors="errors" />
                    <EditorToolboxPropertyBoxShadow v-else-if="slotProps.activeTab === GlitchAnimationProperty.BoxShadow"
                        v-model:config="boxShadow"
                        v-model:localConfig="localBoxShadow" :errors="errors" />
                </template>
            </UiTabs>

        </template>
    </UiCard>
</template>

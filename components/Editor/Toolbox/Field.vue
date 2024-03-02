<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
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

function cardClass(property: GlitchShadowProperty) {
    const c: ClassValue[] = [
        'transition-colors',
    ]

    if (property.enabled) {
        c.push('bg-primary-200');
    } else {
        c.push('opacity-80 bg-neutral-200');
    }

    return cn(c);
}
</script>

<template>
    <UiCard class="bg-primary-100">
        <template #title>
            <div class="flex items-center">
                <UiHeading class="m-0" variant="h3">{{ $t('pages.editor.config.field.offsetFrame') }}</UiHeading>
                <UiFormGroup class="m-0 ml-2" variant="inline" name="offsetFrame">
                    <select id="offsetFrame" name="offsetFrame" :value="localField.offsetFrame"
                        @change="updateOffsetFrame">
                        <option v-for="frame in getPossibleOffsetFrames(field, range)" :key="frame" :value="frame">
                            {{ frame }}
                        </option>
                    </select>
                </UiFormGroup>
            </div>
        </template>

        <template #content>
            <UiCard :class="cardClass(textShadow)">
                <template #content>
                    <EditorToolboxPropertyTextShadow v-model:config="textShadow"
                        v-model:localConfig="localTextShadow" :errors="errors" />
                </template>
            </UiCard>
            <UiCard :class="cardClass(boxShadow)">

                <template #content>
                    <EditorToolboxPropertyBoxShadow v-model:config="boxShadow"
                        v-model:localConfig="localBoxShadow" :errors="errors" />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

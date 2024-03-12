<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { GlitchAnimationProperty, type GlitchErrors, type GlitchShadowField, type GlitchShadowProperty } from '~/glitch/types';
import { Icons } from '~/types/enums';
import { applyUpdater, getPossibleOffsetFrames } from '~/utils/Toobox/utils';

defineProps<{
    errors: Partial<GlitchErrors>,
    range: GlitchShadowField[],
}>();

const field = defineModel<GlitchShadowField>('config', { required: true });
const localField = defineModel<GlitchShadowField>('localConfig', { required: true });
const defaultField = getDefaultField(0, 0, 0);
const defaultTextShadow = <GlitchShadowProperty>deepCopy(defaultField.properties[GlitchAnimationProperty.TextShadow]);
const defaultBoxShadow = <GlitchShadowProperty>deepCopy(defaultField.properties[GlitchAnimationProperty.BoxShadow]);

const textShadow = ref(field.value.properties[GlitchAnimationProperty.TextShadow] || defaultTextShadow);
const localTextShadow = ref(deepCopy(textShadow.value));
const boxShadow = ref(field.value.properties[GlitchAnimationProperty.BoxShadow] || defaultBoxShadow);
const localBoxShadow = ref(deepCopy(boxShadow.value));

const emit = defineEmits<{
    onSelectedTab: [tab: GlitchAnimationProperty],
    removeField: [field: GlitchShadowField]
}>();

const updateOffsetFrame = applyUpdater<GlitchShadowField>({
    obj: field.value,
    localObj: localField.value,
    key: 'offsetFrame',
    modifier: Number
});

function propertyCardClass(property: GlitchShadowProperty) {
    const cls: ClassValue[] = [
        'border-transparent',
    ]

    if (property.enabled) {
        cls.push('');
    } else {
        cls.push('text-neutral-400 opacity-50 hover:opacity-100');
    }

    return cn(cls);
}

function removeField() {
    emit('removeField', field.value);
}

const fieldName = `ranges[${field.value.range}][${field.value.index}]`;
</script>

<template>
    <UiCard noContentPad>
        <template #title>
            <div class="flex items-center justify-between">
                <div class="flex">
                    <UiHeading class="m-0" variant="h3">{{ $t('pages.editor.config.field.offsetFrame') }} {{ localField.range + 1 }}</UiHeading>
                    <UiFormGroup data-v-step="8"
                        class="m-0 ml-3" variant="inline" name="offsetFrame">
                        <UiSelect class="bg-transparent" :modelValue="localField.offsetFrame"
                            :options="getPossibleOffsetFrames(localField, range)" @change="updateOffsetFrame" />
                    </UiFormGroup>
                    <UiHeading class="m-0 pl-2 flex items-center" variant="h5">%</UiHeading>
                </div>
                <div class="flex" data-v-step="15">
                    <UiIcon v-tooltip="$t('pages.editor.config.field.removeField')"
                        class="cursor-pointer stroke-red-600 dark:stroke-red-400" :icon="Icons.Trash"
                        @click="removeField" />
                </div>
            </div>
        </template>

        <template #content>
            <UiCard openable :class="propertyCardClass(textShadow)" contentClasses="pr-0">
                <template #content>
                    <EditorToolboxPropertyTextShadow v-model:config="textShadow" v-model:localConfig="localTextShadow"
                        :errors="errors" :name="`${fieldName}.properties.text-shadow`" />
                </template>
            </UiCard>
            <UiCard openable :class="propertyCardClass(boxShadow)" contentClasses="pr-0">
                <template #content>
                    <EditorToolboxPropertyBoxShadow v-model:config="boxShadow" v-model:localConfig="localBoxShadow"
                        :errors="errors" :name="`${fieldName}.properties.box-shadow`" />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

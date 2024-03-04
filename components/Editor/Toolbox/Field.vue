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
    removeField: [field: GlitchShadowField],
    closeField: []
}>();

const updateOffsetFrame = applyUpdater<GlitchShadowField>({
    obj: field.value,
    localObj: localField.value,
    key: 'offsetFrame',
    modifier: Number
});

function propertyCardClass(property: GlitchShadowProperty) {
    const cls: ClassValue[] = [
        'transition-[background-color]',
        'border-transparent'
    ]

    if (property.enabled) {
        cls.push('bg-primary-200 dark:bg-primary-800');
    } else {
        cls.push('bg-neutral-200 dark:bg-neutral-600');
    }

    return cn(cls);
}

function removeField() {
    emit('removeField', field.value);
}

function closeField() {
    emit('closeField');
}
</script>

<template>
    <UiCard class="bg-primary-100">
        <template #title>
            <div class="flex items-center justify-between">
                <div class="flex">
                    <UiHeading class="m-0" variant="h3">{{ $t('pages.editor.config.field.offsetFrame') }}</UiHeading>
                    <UiFormGroup class="m-0 ml-2" variant="inline" name="offsetFrame">
                        <select class="bg-transparent" id="offsetFrame" name="offsetFrame" :value="localField.offsetFrame"
                            @change="updateOffsetFrame">
                            <option v-for="frame in getPossibleOffsetFrames(localField, range)" :key="frame" :value="frame">
                                {{ frame }}
                            </option>
                        </select>
                    </UiFormGroup>
                </div>
                <div class="flex">
                    <UiIcon :icon="Icons.Trash" class="cursor-pointer" @click="removeField" />
                    <UiIcon :icon="Icons.Close" class="cursor-pointer" @click="closeField" />
                </div>
            </div>
        </template>

        <template #content>
            <UiCard :class="propertyCardClass(textShadow)">
                <template #content>
                    <EditorToolboxPropertyTextShadow v-model:config="textShadow" v-model:localConfig="localTextShadow"
                        :errors="errors" />
                </template>
            </UiCard>
            <UiCard :class="propertyCardClass(boxShadow)">

                <template #content>
                    <EditorToolboxPropertyBoxShadow v-model:config="boxShadow" v-model:localConfig="localBoxShadow"
                        :errors="errors" />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

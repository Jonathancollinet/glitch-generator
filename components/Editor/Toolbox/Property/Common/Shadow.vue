<script setup lang="ts">
import type { GlitchErrors, OptionnalGlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<OptionnalGlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<OptionnalGlitchShadowProperty>('localConfig', { required: true });

const offsetXError = computed(() => getErrorMessage(props.errors, 'offsetX'));
const offsetYError = computed(() => getErrorMessage(props.errors, 'offsetY'));
const blurError = computed(() => getErrorMessage(props.errors, 'blur'));

const updateOffsetX = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'offsetX',
    modifier: Number,
    debounced: 100
});

const updateOffsetY = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'offsetY',
    modifier: Number,
    debounced: 100
});

const updateBlur = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'blur',
    modifier: Number,
    debounced: 100
});

</script>

<template>
    <EditorToolboxPropertyCommonOptions v-model:config="property" v-model:localConfig="localProperty" :errors="errors" />
    <EditorToolboxPropertyColor v-model:config="property.color" v-model:localConfig="localProperty.color" :errors="errors" />
    <UiFormGroup label="pages.editor.config.field.offsetX" :error="offsetXError" name="offsetX">
        <input type="number" id="offsetX" name="offsetX" :value="localProperty.offsetX" @input="updateOffsetX">
    </UiFormGroup>
    <UiFormGroup label="pages.editor.config.field.offsetY" :error="offsetYError" name="offsetY">
        <input type="number" id="offsetY" name="offsetY" :value="localProperty.offsetY" @input="updateOffsetY">
    </UiFormGroup>
    <UiFormGroup label="pages.editor.config.field.blur" :error="blurError" name="blur">
        <input type="number" id="blur" name="blur" :value="localProperty.blur" @input="updateBlur">
    </UiFormGroup>
</template>
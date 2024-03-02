<script setup lang="ts">
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string
}>()

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

const offsetXError = computed(() => getErrorMessage(props.errors, 'offsetX'));
const offsetYError = computed(() => getErrorMessage(props.errors, 'offsetY'));
const blurError = computed(() => getErrorMessage(props.errors, 'blur'));

const updateOffsetX = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'offsetX',
    modifier: Number,
    debounced: 100
});

const updateOffsetY = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'offsetY',
    modifier: Number,
    debounced: 100
});

const updateBlur = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'blur',
    modifier: Number,
    debounced: 100
});

function getName(key: string) {
    return `${props.name}.${key}`;
}

</script>

<template>
    <EditorToolboxPropertyCommonOptions v-model:config="property" v-model:localConfig="localProperty" :name="name" :errors="errors" />
    <div class="flex flex-wrap">
        <EditorToolboxPropertyColor v-model:config="property.color" v-model:localConfig="localProperty.color"
            :name="getName('fieldColor')" :errors="errors" />
        <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.field.offsetX" :error="offsetXError"
            :name="getName('offsetX')">
            <UiInput alignment="center" type="number" :name="getName('offsetX')" :modelValue="localProperty.offsetX"
                @update:modelValue="updateOffsetX" />
        </UiFormGroup>
        <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.field.offsetY" :error="offsetYError"
            :name="getName('offsetY')">
            <UiInput alignment="center" type="number" :name="getName('offsetY')" :modelValue="localProperty.offsetY"
                @update:modelValue="updateOffsetY" />
        </UiFormGroup>
        <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.field.blur" :error="blurError" :name="getName('blur')">
            <UiInput alignment="center" type="number" :name="getName('blur')" :modelValue="localProperty.blur"
                @update:modelValue="updateBlur" />
        </UiFormGroup>
        <slot />
    </div>
</template>
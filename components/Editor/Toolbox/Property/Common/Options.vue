<script lang="ts" setup>
import type { GlitchErrors, OptionnalGlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<OptionnalGlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<OptionnalGlitchShadowProperty>('localConfig', { required: true });

const enabledError = computed(() => getErrorMessage(props.errors, 'enabled'));
const fillAllFramesError = computed(() => getErrorMessage(props.errors, 'fillAllFrames'));

const updateEnabled = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'enabled',
    modifier: Boolean,
    debounced: 100
});

const updateFillAllFrames = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'fillAllFrames',
    modifier: Boolean,
    debounced: 100
});
</script>

<template>
    <UiFormGroup label="pages.editor.config.field.enabled" :error="enabledError" name="enabled">
        <input type="checkbox" id="enabled" name="enabled" :checked="localProperty.enabled"
            @change="updateEnabled">
    </UiFormGroup>
    <UiFormGroup label="pages.editor.config.field.fillAllFrames" :error="fillAllFramesError" name="fillAllFrames">
        <input type="checkbox" id="fillAllFrames" name="fillAllFrames" :checked="localProperty.fillAllFrames"
            @change="updateFillAllFrames">
    </UiFormGroup>
</template>

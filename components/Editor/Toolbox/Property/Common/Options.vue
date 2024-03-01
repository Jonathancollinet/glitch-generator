<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

const enabledError = computed(() => getErrorMessage(props.errors, 'enabled'));
const fillAllFramesError = computed(() => getErrorMessage(props.errors, 'fillAllFrames'));

const updateEnabled = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'enabled',
    modifier: Boolean
});

const updateFillAllFrames = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'fillAllFrames',
    modifier: Boolean
});
</script>

<template>
    <div class="flex">
        <UiCheckbox label="pages.editor.config.field.enabled" name="enabled" :checked="localProperty.enabled"
            :updateFn="updateEnabled" :error="enabledError" />
        <UiCheckbox label="pages.editor.config.field.fillAllFrames" name="fillAllFrames"
            :checked="localProperty.fillAllFrames" :updateFn="updateFillAllFrames" :error="fillAllFramesError" />
    </div>
</template>

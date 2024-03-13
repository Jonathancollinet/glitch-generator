<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string,
    label?: string,
}>();

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

const enabledError = computed(() => getErrorMessage(props.errors, 'enabled'));
const fillAllFramesError = computed(() => getErrorMessage(props.errors, 'fillAllFrames'));

const updateOptions = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
});

const updateEnabled = updateOptions({
    key: 'enabled',
    modifier: Boolean
});

const updateFillAllFrames = updateOptions({
    key: 'fillAllFrames',
    modifier: Boolean
});

function getName(key: string) {
    return `${props.name}.${key}`;
}
</script>

<template>
    <div class="flex justify-between mb-2 *:m-0 last:mb-0">
        <UiCheckbox :label="label || `pages.editor.config.field.${name}`" :name="getName('enabled')"
            :checked="localProperty.enabled" :updateFn="updateEnabled" :error="enabledError" />
        <UiCheckbox v-if="property.enabled" :label="`pages.editor.config.field.fillAllFrames`"
            :name="getName('fillAllFrames')" :checked="localProperty.fillAllFrames" :updateFn="updateFillAllFrames"
            :error="fillAllFramesError" />
    </div>
</template>
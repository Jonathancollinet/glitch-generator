<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string
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

function getName(key: string) {
    return `${props.name}.${key}`;
}
</script>

<template>
    <div class="flex justify-between mb-2 *:m-0 last:mb-0">
        <UiCheckbox data-v-step="9" :label="`pages.editor.config.field.${name}`" :name="getName('enabled')" :checked="localProperty.enabled"
            :updateFn="updateEnabled" :error="enabledError" />
        <UiCheckbox data-v-step="10" :label="`pages.editor.config.field.fillAllFrames`" :name="getName('fillAllFrames')"
            :checked="localProperty.fillAllFrames" :updateFn="updateFillAllFrames" :error="fillAllFramesError" />
    </div>
</template>

<script lang="ts" setup>
import type { GlitchErrors, OptionnalGlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<OptionnalGlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<OptionnalGlitchShadowProperty>('localConfig', { required: true });

const spreadError = computed(() => getErrorMessage(props.errors, 'spread'));

const updateSpread = applyUpdater<OptionnalGlitchShadowProperty>({
    obj: property.value,
    key: 'spread',
    modifier: Number,
    debounced: 100
});

</script>

<template>
    <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty" :errors="errors" />
    <UiFormGroup label="pages.editor.config.field.spread" :error="spreadError" name="spread">
        <input type="number" id="spread" name="spread" :value="localProperty.spread" @input="updateSpread">
    </UiFormGroup>
</template>
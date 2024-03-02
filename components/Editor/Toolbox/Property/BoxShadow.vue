<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const property = defineModel<GlitchShadowProperty>('config', { required: true });
const localProperty = defineModel<GlitchShadowProperty>('localConfig', { required: true });

const spreadError = computed(() => getErrorMessage(props.errors, 'spread'));

const updateSpread = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'spread',
    modifier: Number,
    debounced: 100
});

</script>

<template>
    <div>
        <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty"
            name="boxShadow" :errors="errors">
            <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.field.spread" :error="spreadError"
                name="spread">
                <UiInput alignment="center" type="number" name="spread" :modelValue="localProperty.spread"
                    @update:modelValue="updateSpread" />
            </UiFormGroup>
        </EditorToolboxPropertyCommonShadow>
    </div>
</template>
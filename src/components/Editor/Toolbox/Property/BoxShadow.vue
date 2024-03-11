<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string

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

function getName(key: string) {
    return `${props.name}.${key}`;
}

</script>

<template>
    <div>
        <EditorToolboxPropertyCommonShadow v-model:config="property" v-model:localConfig="localProperty"
            propertyName="boxShadow" :name="name" :errors="errors">
            <EditorToolboxFieldPropertyWithRange label="pages.editor.config.field.spread" min="0"
                :value="localProperty.spread" :name="getName('spread')" :error="spreadError" :update="updateSpread" />
        </EditorToolboxPropertyCommonShadow>
    </div>
</template>
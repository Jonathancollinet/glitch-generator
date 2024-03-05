<script setup lang="ts">
import type { GlitchErrors, GlitchShadowProperty } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';
import FieldPropertyWithRange from '../../FieldPropertyWithRange.vue';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string,
    propertyName: string
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
    debounced: 20
});

const updateOffsetY = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'offsetY',
    modifier: Number,
    debounced: 20
});

const updateBlur = applyUpdater<GlitchShadowProperty>({
    obj: property.value,
    localObj: localProperty.value,
    key: 'blur',
    modifier: Number,
    debounced: 20
});

function getName(key: string) {
    return `${props.name}.${key}`;
}

</script>

<template>
    <EditorToolboxPropertyCommonOptions v-model:config="property" v-model:localConfig="localProperty"
        :name="propertyName" :errors="errors" />
    <div class="flex flex-wrap" v-if="property.enabled">
        <EditorToolboxPropertyColor v-model:config="property.color" v-model:localConfig="localProperty.color"
            labelName="textColor" :name="name" :errors="errors" />
        <FieldPropertyWithRange label="pages.editor.config.field.offsetX" :value="localProperty.offsetX"
            :name="getName('offsetX')" :error="offsetXError" :update="updateOffsetX" />
        <FieldPropertyWithRange label="pages.editor.config.field.offsetY" :value="localProperty.offsetY"
            :name="getName('offsetY')" :error="offsetYError" :update="updateOffsetY" />
        <FieldPropertyWithRange label="pages.editor.config.field.blur" min="0" :value="localProperty.blur"
            :name="getName('blur')" :error="blurError" :update="updateBlur" />
        <slot />
    </div>
</template>
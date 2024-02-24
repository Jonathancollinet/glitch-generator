<script lang="ts" setup>
import type { GlitchErrors, GlitchShadowField } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    selected: boolean,
    isLastSelected: boolean
}>()

const field = defineModel<GlitchShadowField>('config', { required: true });
const localField = defineModel<GlitchShadowField>('localConfig', { required: true });

const emit = defineEmits([
    'selectField',
    'selectUniqueField',
    'selectAllFieldsTo',
    'deselectField'
])

const isBoxShadow = computed(() => localField.value.property === 'box-shadow');

const propertyError = computed(() => getErrorMessage(props.errors, 'property'));
const offsetFrameError = computed(() => getErrorMessage(props.errors, 'offsetFrame'));
const offsetXError = computed(() => getErrorMessage(props.errors, 'offsetX'));
const offsetYError = computed(() => getErrorMessage(props.errors, 'offsetY'));
const blurError = computed(() => getErrorMessage(props.errors, 'blur'));
const spreadError = computed(() => getErrorMessage(props.errors, 'spread'));

const updateProperty = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'property',
    debounced: 100
});

const updateOffsetFrame = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'offsetFrame',
    modifier: Number,
    debounced: 100
});

const updateOffsetX = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'offsetX',
    modifier: Number,
    debounced: 100
});

const updateOffsetY = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'offsetY',
    modifier: Number,
    debounced: 100
});

const updateBlur = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'blur',
    modifier: Number,
    debounced: 100
});

const updateSpread = applyUpdater<GlitchShadowField>({
    obj: localField.value,
    key: 'spread',
    modifier: Number,
    debounced: 100
});

function selectField(e: MouseEvent) {
    if (e.ctrlKey) {
        if (props.selected) {
            emit('deselectField', field.value);
        } else {
            emit('selectField', field.value);
        }
    } else if (e.shiftKey) {
        emit('selectAllFieldsTo', field.value);
    } else {
        emit('selectUniqueField', field.value);
    }
}
</script>

<template>
    <div :class="'select-none inline-flex p-2 border-blue-400 bg-blue-200 m-2 ' + (isLastSelected ? 'border-2' : '')"
    @click="selectField">
        <div>Field-{{ field.index }} - {{ selected }}</div>
        <!-- todo: do in the same way as in the Editor.vue -->
        <!-- <div v-if="selected">
            <UiFormGroup label="pages.editor.config.field.property" :error="propertyError" name="property">
                <select name="property" id="property" :value="localField.property" @change="updateProperty">
                    <option value="text-shadow">text-shadow</option>
                    <option value="box-shadow">box-shadow</option>
                </select>
            </UiFormGroup>
            <EditorToolboxColor v-model:config="field.color" v-model:localConfig="localField.color" :errors="errors" />
            <UiFormGroup label="pages.editor.config.field.offsetFrame" :error="offsetFrameError" name="offsetFrame">
                <input type="number" id="offsetFrame" name="offsetFrame" :value="localField.offsetFrame"
                    @input="updateOffsetFrame">
            </UiFormGroup>
            <UiFormGroup label="pages.editor.config.field.offsetX" :error="offsetXError" name="offsetX">
                <input type="number" id="offsetX" name="offsetX" :value="localField.offsetX" @input="updateOffsetX">
            </UiFormGroup>
            <UiFormGroup label="pages.editor.config.field.offsetY" :error="offsetYError" name="offsetY">
                <input type="number" id="offsetY" name="offsetY" :value="localField.offsetY" @input="updateOffsetY">
            </UiFormGroup>
            <UiFormGroup label="pages.editor.config.field.blur" :error="blurError" name="blur">
                <input type="number" id="blur" name="blur" :value="localField.blur" @input="updateBlur">
            </UiFormGroup>
            <UiFormGroup v-if="isBoxShadow" label="pages.editor.config.field.spread" :error="spreadError" name="spread">
                <input type="number" id="spread" name="spread" :value="localField.spread" @input="updateSpread">
            </UiFormGroup>
        </div> -->
    </div>
</template>
<script lang="ts" setup>
import type { GlitchConfig, GlitchErrors, GlitchShadowField, ManipulableGlitchShadowField } from '~/glitch/types';
import { applyUpdater, getErrorMessage } from '~/utils/Toobox/utils';

const props = defineProps<{
    selectedFields: GlitchShadowField[],
    config: GlitchConfig,
    errors: Partial<GlitchErrors>,
}>();

const emit = defineEmits(['update']);

const defaultFieldValue: ManipulableGlitchShadowField = {
    property: 'nothing',
    fillAllFrames: true,
    color: {
        hex: '#000000',
        alphaPercent: 100
    },
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    spread: 0
};

const data = ref<ManipulableGlitchShadowField>(deepCopy(defaultFieldValue));
const localData = ref<ManipulableGlitchShadowField>(deepCopy(defaultFieldValue));

function copyField(field: ManipulableGlitchShadowField) {
    const copy = deepCopy(field);
    delete copy.index;
    delete copy.range;
    delete copy.offsetFrame;
    copy.property = 'nothing';
    data.value = copy;
    localData.value = deepCopy(copy);
}

watch(props.selectedFields, (newVal) => {
    if (newVal.length === 1) {
        data.value = deepCopy(newVal[0]) as ManipulableGlitchShadowField;
        localData.value = deepCopy(newVal[0]) as ManipulableGlitchShadowField;
    } else {
        copyField(defaultFieldValue);
    }
});

if (props.selectedFields.length === 1) {
    copyField(props.selectedFields[0]);
}

const isBoxShadow = computed(() => localData.value.property === 'box-shadow');

const propertyError = computed(() => getErrorMessage(props.errors, 'property'));
const fillAllFramesError = computed(() => getErrorMessage(props.errors, 'fillAllFrames'));
const offsetXError = computed(() => getErrorMessage(props.errors, 'offsetX'));
const offsetYError = computed(() => getErrorMessage(props.errors, 'offsetY'));
const blurError = computed(() => getErrorMessage(props.errors, 'blur'));
const spreadError = computed(() => getErrorMessage(props.errors, 'spread'));

const updateProperty = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'property',
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
})

const updateFillAllFrames = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'fillAllFrames',
    modifier: Boolean,
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
});

const updateOffsetX = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'offsetX',
    modifier: Number,
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
});

const updateOffsetY = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'offsetY',
    modifier: Number,
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
});

const updateBlur = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'blur',
    modifier: Number,
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
});

const updateSpread = applyUpdater<ManipulableGlitchShadowField>({
    obj: data.value,
    key: 'spread',
    modifier: Number,
    debounced: 100,
    onUpdate: (obj) => {
        emit('update', obj);
    }
});

watch(data.value.color, () => {
    emit('update', data.value);
});

</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.field.property" :error="propertyError" name="property">
            <select name="property" id="property" :value="localData.property" @change="updateProperty">
                <option value="">nothing</option>
                <option value="text-shadow">text-shadow</option>
                <option value="box-shadow">box-shadow</option>
            </select>
        </UiFormGroup>
        <EditorToolboxColor v-model:config="data.color" v-model:localConfig="localData.color" :errors="errors" />
        <UiFormGroup label="pages.editor.config.field.fillAllFrames" :error="fillAllFramesError" name="fillAllFrames">
            <input type="checkbox" id="fillAllFrames" name="fillAllFrames" :checked="localData.fillAllFrames" @change="updateFillAllFrames">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.field.offsetX" :error="offsetXError" name="offsetX">
            <input type="number" id="offsetX" name="offsetX" :value="localData.offsetX" @input="updateOffsetX">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.field.offsetY" :error="offsetYError" name="offsetY">
            <input type="number" id="offsetY" name="offsetY" :value="localData.offsetY" @input="updateOffsetY">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.field.blur" :error="blurError" name="blur">
            <input type="number" id="blur" name="blur" :value="localData.blur" @input="updateBlur">
        </UiFormGroup>
        <UiFormGroup v-if="isBoxShadow" label="pages.editor.config.field.spread" :error="spreadError" name="spread">
            <input type="number" id="spread" name="spread" :value="localData.spread" @input="updateSpread">
        </UiFormGroup>
    </div>
</template>

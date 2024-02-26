<script lang="ts" setup>
import type { GlitchBaseText, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const config = defineModel<GlitchBaseText>('config', { required: true });
const localConfig = defineModel<GlitchBaseText>('localConfig', { required: true });

const textSizeError = computed(() => getErrorMessage(props.errors, 'text.size'));
const textUnitError = computed(() => getErrorMessage(props.errors, 'text.unit'));
const textMessageError = computed(() => getErrorMessage(props.errors, 'text.message'));

const updateTextSize = applyUpdater<GlitchBaseText>({
    obj: config.value,
    key: 'size',
    modifier: Number
});

const updateTextUnit = applyUpdater<GlitchBaseText>({
    obj: config.value,
    key: 'unit'
});

const updateMessage = applyUpdater<GlitchBaseText>({
    obj: config.value,
    key: 'message'
});

</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.textSize" :error="textSizeError" name="textSize">
            <UiInput type="number" debounce :debounceTime="100" :debounceFn="updateTextSize" name="textSize"
                :modelValue="localConfig.size" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textUnit" :error="textUnitError" name="textUnit">
            <select name="textUnit" id="textUnit" :value="localConfig.unit" @change="updateTextUnit">
                <option value="px">px</option>
                <option value="pt">pt</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
            </select>
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.message" :error="textMessageError" name="message">
            <UiInput debounce :debounceTime="100" :debounceFn="updateMessage" name="message"
                :modelValue="localConfig.message" />
        </UiFormGroup>
        <EditorToolboxPropertyColor v-model:config="config.color" v-model:localConfig="localConfig.color" :errors="errors" />
    </div>
</template>

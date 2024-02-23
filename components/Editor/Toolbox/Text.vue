<script lang="ts" setup>
import type { GlitchBaseText, GlitchConfig, GlitchErrors } from '~/plugins/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const config = defineModel<GlitchConfig>('config');
const localConfig = defineModel<GlitchConfig>('localConfig');

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const textSizeError = computed(() => getErrorMessage(props.errors, 'text.size'));
const textUnitError = computed(() => getErrorMessage(props.errors, 'text.unit'));
const textMessageError = computed(() => getErrorMessage(props.errors, 'text.message'));

const confValueText = config.value?.text || {} as GlitchBaseText;

type ConfValueText = typeof confValueText;

const updateTextSize = applyUpdater<ConfValueText>({
    obj: confValueText,
    key: 'size',
    modifier: Number
});

const updateTextUnit = applyUpdater<ConfValueText>({
    obj: confValueText,
    key: 'unit'
});

const updateMessage = applyUpdater<ConfValueText>({
    obj: confValueText,
    key: 'message'
});

</script>

<template>
    <div v-if="config && localConfig">
        <UiFormGroup label="pages.editor.config.textSize" :error="textSizeError" name="textSize">
            <UiInput debounce :debounceTime="100" :debounceFn="updateTextSize" name="textSize"
                :modelValue="localConfig.text.size" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textUnit" :error="textUnitError" name="textUnit">
            <select name="textUnit" id="textUnit" :value="config.text.unit" @change="updateTextUnit">
                <option value="px">px</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
            </select>
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.message" :error="textMessageError" name="message">
            <UiInput debounce :debounceTime="100" :debounceFn="updateMessage" name="message"
                :modelValue="localConfig.text.message" />
        </UiFormGroup>
        <EditorToolboxColor v-model:color="config.text.color" v-model:localConfig="localConfig" :errors="errors" />
    </div>
</template>

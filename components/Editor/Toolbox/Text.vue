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
const textPaddingError = computed(() => getErrorMessage(props.errors, 'text.padding'));
const textHeightError = computed(() => getErrorMessage(props.errors, 'text.height'));

const updateTextSize = applyUpdater<GlitchBaseText>({
    obj: config.value,
    localObj: localConfig.value,
    key: 'size',
    modifier: Number,
    debounced: 100
});

const updateTextUnit = applyUpdater<GlitchBaseText>({
    obj: config.value,
    localObj: localConfig.value,
    key: 'unit',
    debounced: 100
});

const updateMessage = applyUpdater<GlitchBaseText>({
    obj: config.value,
    localObj: localConfig.value,
    key: 'message',
    debounced: 100
});

const updatePadding = applyUpdater<GlitchBaseText>({
    obj: config.value,
    localObj: localConfig.value,
    key: 'padding',
    modifier: Number,
    debounced: 100
});

const updateHeight = applyUpdater<GlitchBaseText>({
    obj: config.value,
    localObj: localConfig.value,
    key: 'height',
    modifier: Number,
    debounced: 100
});
</script>

<template>
    <div>
        <div class="flex">
            <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.text.fontSize" :error="textSizeError"
                name="textSize">
                <UiInput alignment="center" type="tel" :debounceFn="updateTextSize" name="textSize"
                    :modelValue="localConfig.size" />
            </UiFormGroup>
            <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.text.padding" :error="textPaddingError"
                name="textPadding">
                <UiInput alignment="center" type="tel" :debounceFn="updatePadding" name="textPadding"
                    :modelValue="localConfig.padding" />
            </UiFormGroup>
            <UiFormGroup alignment="center" size="tiny" label="pages.editor.config.text.height" :error="textHeightError"
                name="textHeight">
                <UiInput alignment="center" type="tel" :debounceFn="updateHeight" name="textHeight"
                    :modelValue="localConfig.height" />
            </UiFormGroup>
        </div>
        <div class="flex">
            <EditorToolboxPropertyColor v-model:config="config.bgColor" v-model:localConfig="localConfig.bgColor"
                name="textBgColor" :errors="errors" />
            <EditorToolboxPropertyColor v-model:config="config.color" v-model:localConfig="localConfig.color"
                name="textColor" :errors="errors" />
        </div>
        <div class="flex">
            <UiFormGroup label="pages.editor.config.text.message" :error="textMessageError" name="message">
                <UiInput :debounceFn="updateMessage" name="message" :modelValue="localConfig.message" />
            </UiFormGroup>
        </div>
        <div class="flex">
            <slot />
        </div>
    </div>
</template>

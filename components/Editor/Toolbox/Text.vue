<script lang="ts" setup>
import type { GlitchBaseText, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const config = defineModel<GlitchBaseText>('config', { required: true });
const localConfig = defineModel<GlitchBaseText>('localConfig', { required: true });

const textSizeError = computed(() => getErrorMessage(props.errors, 'text.size', true));
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
    <UiCard openable :isOpen="false">
        <template #title>
            <UiHeading variant="h3">{{ $t('pages.editor.config.text.title') }}</UiHeading>
        </template>

        <template #content>
            <UiHeading class="mt-0" variant="h5">Text</UiHeading>
            <UiCard openable>
                <template #content>
                    <UiFormGroup class="ml-0 w-full" inline size="tiny" label="pages.editor.config.text.fontSize"
                        :error="textSizeError" name="textSize">
                        <UiInput class="w-[40px]" alignment="center" type="tel" :onUpdate="updateTextSize"
                            name="textSize" :modelValue="localConfig.size" />
                    </UiFormGroup>
                    <EditorToolboxPropertyColor class="ml-0 " v-model:config="config.color"
                        v-model:localConfig="localConfig.color" name="textColor" :errors="errors" />
                    <UiFormGroup class="ml-0" :error="textMessageError" name="message">
                        <UiInput :onUpdate="updateMessage" name="message" :modelValue="localConfig.message" />
                    </UiFormGroup>
                </template>
            </UiCard>
            <UiHeading variant="h5">Container</UiHeading>
            <UiCard openable>

                <template #content>
                    <UiFormGroup class="ml-0 w-full" inline size="tiny" label="pages.editor.config.text.padding"
                        :error="textPaddingError" name="textPadding">
                        <UiInput class="w-[40px]" alignment="center" type="tel" :onUpdate="updatePadding"
                            name="textPadding" :modelValue="localConfig.padding" />
                    </UiFormGroup>
                    <UiFormGroup class="ml-0 w-full" inline size="tiny" label="pages.editor.config.text.height"
                        :error="textHeightError" name="textHeight">
                        <UiInput class="w-[40px]" alignment="center" type="tel" :onUpdate="updateHeight"
                            name="textHeight" :modelValue="localConfig.height" />
                    </UiFormGroup>
                    <EditorToolboxPropertyColor class="ml-0" v-model:config="config.bgColor"
                        v-model:localConfig="localConfig.bgColor" name="textBgColor" :errors="errors" />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

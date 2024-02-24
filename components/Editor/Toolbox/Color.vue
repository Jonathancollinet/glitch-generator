<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const config = defineModel<GlitchColor>('color', { required: true });
const localConfig = defineModel<GlitchColor>('localConfig', { required: true });

const props = defineProps<{
    errors: Partial<GlitchErrors>
}>()

const textColorHexError = computed(() => getErrorMessage(props.errors, 'text.color.hex'));
const textColorAlphaPercentError = computed(() => getErrorMessage(props.errors, 'text.color.alphaPercent'));

const updateTextColorHex = applyUpdater<GlitchColor>({
    obj: config.value,
    key: 'hex',
    modifier: undefined,
    debounced: 100
});

const updateTextColorAlphaPercent = applyUpdater<GlitchColor>({
    obj: config.value,
    key: 'alphaPercent',
    modifier: Number,
    debounced: 100
});
</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.textColorHex" :error="textColorHexError" name="textColorHex">
            <input type="color" id="textColorHex" name="textColorHex" :value="localConfig.hex"
                @input="updateTextColorHex">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textColorAlphaPercent" :error="textColorAlphaPercentError"
            name="textColorAlphaPercent">
            <input type="range" step="1" min="0" max="100" id="textColorAlphaPercent" name="textColorAlphaPercent"
                :value="localConfig.alphaPercent" @input="updateTextColorAlphaPercent">
        </UiFormGroup>
    </div>
</template>

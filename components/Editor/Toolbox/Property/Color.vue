<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>
}>()

const color = defineModel<GlitchColor>('config', { required: true });
const localColor = defineModel<GlitchColor>('localConfig', { required: true });

const textColorHexError = computed(() => getErrorMessage(props.errors, 'text.color.hex'));
const textColorAlphaPercentError = computed(() => getErrorMessage(props.errors, 'text.color.alphaPercent'));

const updateTextColorHex = applyUpdater<GlitchColor>({
    obj: color.value,
    localObj: localColor.value,
    key: 'hex',
    modifier: undefined,
    debounced: 100
});

const updateTextColorAlphaPercent = applyUpdater<GlitchColor>({
    obj: color.value,
    localObj: localColor.value,
    key: 'alphaPercent',
    modifier: Number,
    debounced: 100
});
</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.textColorHex" :error="textColorHexError" name="textColorHex">
            <input type="color" id="textColorHex" name="textColorHex" :value="localColor.hex"
                @input="updateTextColorHex">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textColorAlphaPercent" :error="textColorAlphaPercentError"
            name="textColorAlphaPercent">
            <input type="range" step="1" min="0" max="100" id="textColorAlphaPercent" name="textColorAlphaPercent"
                :value="localColor.alphaPercent" @input="updateTextColorAlphaPercent">
        </UiFormGroup>
    </div>
</template>

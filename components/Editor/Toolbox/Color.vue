<script lang="ts" setup>
import type { GlitchColor, GlitchConfig, GlitchErrors } from '~/plugins/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const configColor = defineModel<GlitchColor>('color');
const localConfig = defineModel<GlitchConfig>('localConfig');

const props = defineProps<{
    errors: Partial<GlitchErrors>,
        localConfig: GlitchColor
}>()

const textColorHexError = computed(() => getErrorMessage(props.errors, 'text.color.hex'));
const textColorAlphaPercentError = computed(() => getErrorMessage(props.errors, 'text.color.alphaPercent'));

const confValue = configColor?.value || {} as GlitchColor;

const updateTextColorHex = applyUpdater<GlitchColor>({
    obj: confValue,
    key: 'hex',
    modifier: undefined,
    debounced: 100
});

const updateTextColorAlphaPercent = applyUpdater<GlitchColor>({
    obj: confValue,
    key: 'alphaPercent',
    modifier: Number,
    debounced: 100
});
</script>

<template>
  <div v-if="configColor && localConfig">
    <UiFormGroup label="pages.editor.config.textColorHex" :error="textColorHexError" name="textColorHex">
            <input type="color" id="textColorHex" name="textColorHex" :value="localConfig.text.color.hex"
                @input="updateTextColorHex">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textColorAlphaPercent" :error="textColorAlphaPercentError"
            name="textColorAlphaPercent">
            <input type="range" step="1" min="0" max="100" id="textColorAlphaPercent" name="textColorAlphaPercent"
                :value="localConfig.text.color.alphaPercent" @input="updateTextColorAlphaPercent">
        </UiFormGroup>
  </div>
</template>

<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string
    labelName?: string
}>()

const localName = computed(() => props.labelName || props.name);

const color = defineModel<GlitchColor>('config', { required: true });
const localColor = defineModel<GlitchColor>('localConfig', { required: true });

const hexError = computed(() => getErrorMessage(props.errors, `${props.name}.color.hex`));
const alphaPercentError = computed(() => getErrorMessage(props.errors, `${props.name}.color.alphaPercent`));
const hexName = `${localName.value}Hex`;
const alphaPercentName = `${localName.value}AlphaPercent`;

const updateHex = applyUpdater<GlitchColor>({
    obj: color.value,
    localObj: localColor.value,
    key: 'hex',
    modifier: undefined,
    debounced: 100
});

const updateAlphaPercent = applyUpdater<GlitchColor>({
    obj: color.value,
    localObj: localColor.value,
    key: 'alphaPercent',
    modifier: Number,
    debounced: 100
});
</script>

<template>
    <UiFormGroup inline class="w-full mb-2" :label="`pages.editor.config.color.${hexName}`"
        :error="hexError || alphaPercentError">
        <UiInput class="w-7 h-6" alignment="center" type="color" :name="hexName" :modelValue="localColor.hex"
            :onUpdate="updateHex" />
        <UiInput class="w-10 ml-1" alignment="center" type="tel" :name="alphaPercentName"
            :modelValue="localColor.alphaPercent" :onUpdate="updateAlphaPercent" />
    </UiFormGroup>
</template>

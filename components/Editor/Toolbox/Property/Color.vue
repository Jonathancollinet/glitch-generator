<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string
}>()

const color = defineModel<GlitchColor>('config', { required: true });
const localColor = defineModel<GlitchColor>('localConfig', { required: true });

const hexError = computed(() => getErrorMessage(props.errors, `${props.name}.color.hex`));
const alphaPercentError = computed(() => getErrorMessage(props.errors, `${props.name}.color.alphaPercent`));
const hexName = `${props.name}Hex`;
const alphaPercentName = `${props.name}AlphaPercent`;

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
    <UiFormGroup class="w-[70px]" :label="`pages.editor.config.color.${hexName}`" alignment="center" :error="hexError"
        :name="hexName">
        <div class="flex">
            <UiInput class="w-[calc(100%-40px)]" alignment="center" type="color" :name="hexName" :modelValue="localColor.hex" :debounceFn="updateHex" />
            <UiInput class="w-[40px]" alignment="center" type="tel" :name="alphaPercentName" :modelValue="localColor.alphaPercent"
                :debounceFn="updateAlphaPercent" />
        </div>
    </UiFormGroup>
</template>

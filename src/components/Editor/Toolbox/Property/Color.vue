<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils';
import { Sketch } from '@ckpack/vue-color';

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string
    labelName?: string
}>()

const localName = computed(() => props.labelName || props.name);

const color = defineModel<GlitchColor>('config', { required: true });
const localColor = defineModel<GlitchColor>('localConfig', { required: true });

const displaySketch = ref(false);
const colors = ref<any>();

const hexName = `${localName.value}Hex`;
const alphaPercentName = `${localName.value}AlphaPercent`;

const hexError = computed(() => getErrorMessage(props.errors, `${props.name}.color.hex`));
const alphaPercentError = computed(() => getErrorMessage(props.errors, `${props.name}.color.alphaPercent`));

const presetColors = ref(useAllColors());

const updateColor = applyUpdater<GlitchColor>({
    obj: color.value,
    localObj: localColor.value
});

const updateHex = updateColor({
    key: 'hex',
    modifier: undefined,
    debounced: 100
});

const updateAlphaPercent = updateColor({
    key: 'alphaPercent',
    modifier: Number,
    debounced: 100
});

watch(colors, (newVal) => {
    if (updateHex) {
        updateHex(newVal.hex.toLowerCase());
    }

    if (updateAlphaPercent) {
        updateAlphaPercent(Math.round(newVal.a * 100).toString());
    }
}, { deep: true });

onMounted(() => {
    if (color.value.hex) {
        colors.value = {
            hex: color.value.hex,
            a: color.value.alphaPercent / 100
        }
    }
});
</script>

<template>
    <UiFormGroup inline class="relative w-full mb-2" :label="`pages.editor.config.color.${hexName}`"
        :error="hexError || alphaPercentError" v-click-outside="() => displaySketch = false">
        <div class="h-6 w-6 cursor-pointer hover:opacity-80 border-4 border-primary-200 bg-[white]"
            @click="displaySketch = true">
            <div class="h-full w-full" :style="{ background: hexToRGB(localColor.hex, localColor.alphaPercent) }"></div>
        </div>
        <Sketch :key="presetColors.toString()" class="!absolute z-10 top-0 left-0" v-if="displaySketch" v-model="colors"
            :presetColors="presetColors" />
    </UiFormGroup>
</template>

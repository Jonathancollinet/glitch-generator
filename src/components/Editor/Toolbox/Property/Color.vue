<script lang="ts" setup>
import type { GlitchColor, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils';
import { Sketch } from '@ckpack/vue-color';
import type { ClassValue } from 'class-variance-authority/types';

type SketchColor = {
    r: number,
    g: number,
    b: number,
    a: number
};

const props = defineProps<{
    errors: Partial<GlitchErrors>,
    name: string,
    noLabel?: boolean,
    labelName?: string,
    colorClasses?: string
}>();

const localName = computed(() => props.labelName || props.name);

const color = defineModel<GlitchColor>('config', { required: true });
const localColor = defineModel<GlitchColor>('localConfig', { required: true });

const displaySketch = ref(false);
const colors = ref<SketchColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1
}) as any;

const hexName = `${localName.value}Hex`;

const hexError = computed(() => getErrorMessage(props.errors, `${props.name}.color.hex`));
const alphaPercentError = computed(() => getErrorMessage(props.errors, `${props.name}.color.alphaPercent`));

const presetColors = useAllColors();

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

function displayColor() {
    displaySketch.value = true;
}

function hideColor() {
    displaySketch.value = false;
}

watch(colors, (newVal) => {
    if (updateHex) {
        updateHex(RGBToHex(newVal.rgba.a, newVal.rgba.g, newVal.rgba.b).toLowerCase());
    }

    if (isNotFalsy(updateAlphaPercent)) {
        updateAlphaPercent(Math.round(newVal.a * 100).toString());
    }
}, { deep: true });

onMounted(() => {
    if (color.value.hex) {
        const rgba = {
            ...hexToRGBObject(color.value.hex),
            a: color.value.alphaPercent / 100
        };

        colors.value = {
            rgba,
            a: color.value.alphaPercent / 100
        };
    }
});

const containerColorClasses: ClassValue[] = [
    'h-4 w-4 cursor-pointer hover:opacity-80'
];
</script>

<template>
    <UiFormGroup inline class="relative w-full mb-2" :label="(!noLabel && `pages.editor.config.color.${hexName}`) || ''"
        :error="hexError || alphaPercentError" v-click-outside="hideColor" @labelClick="displayColor">
        <div :class="cn(containerColorClasses, colorClasses ?? '')"
            @click="displayColor">
            <EditorToolboxColorDisplay :color="localColor" />
        </div>
        <Sketch v-if="displaySketch" class="!absolute z-10 top-0 left-0 bg-red-500" v-model="colors"
            :presetColors="presetColors" />
    </UiFormGroup>
</template>

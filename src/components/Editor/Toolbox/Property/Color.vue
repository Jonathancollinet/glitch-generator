<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { getErrorMessage, applyUpdater } from "~/lib/toolbox/utils";
import { Sketch } from "@ckpack/vue-color";
import type { ClassValue } from "class-variance-authority/types";

type SketchColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};

const props = defineProps<{
    errors: Partial<G.Errors>;
    name: string;
    noLabel?: boolean;
    labelName?: string;
    colorClasses?: string;
}>();

const localName = computed(() => props.labelName || props.name);

const color = defineModel<G.Color>("config", { required: true });
const localColor = defineModel<G.Color>("localConfig", { required: true });

const displaySketch = ref(false);
const colors = ref<SketchColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
}) as any;

const hexName = `${localName.value}Hex`;

const hexError = computed(() =>
    getErrorMessage(props.errors, `${props.name}.color.hex`),
);
const alphaPercentError = computed(() =>
    getErrorMessage(props.errors, `${props.name}.color.alphaPercent`),
);

const presetColors = ref(useAllColors());

const updateColor = applyUpdater<G.Color>({
    obj: color.value,
    localObj: localColor.value,
});

const updateHex = updateColor({
    key: "hex",
    modifier: undefined,
    debounced: 100,
});

const updateAlphaPercent = updateColor({
    key: "alphaPercent",
    modifier: Number,
    debounced: 100,
});

function displayColor() {
    displaySketch.value = true;
}

function hideColor() {
    displaySketch.value = false;
}

watch(
    colors,
    (newVal) => {
        if (updateHex) {
            updateHex(
                newVal.hex ||
                    RGBToHex(newVal.r, newVal.g, newVal.b).toLowerCase(),
            );
        }

        if (isNotFalsy(updateAlphaPercent)) {
            updateAlphaPercent(Math.round(newVal.a * 100).toString());
        }
    },
    { deep: true },
);

onMounted(() => {
    if (color.value.hex) {
        const rgb = hexToRGBObject(color.value.hex);

        colors.value = {
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            a: color.value.alphaPercent / 100,
        };
    }
});

const containerColorClasses: ClassValue[] = [
    "h-4 w-4 cursor-pointer hover:opacity-80",
];
</script>

<template>
    <UiFormGroup
        v-click-outside="hideColor"
        inline
        class="relative mb-2 w-full"
        :label="(!noLabel && `pages.editor.config.color.${hexName}`) || ''"
        :error="hexError || alphaPercentError"
        @label-click="displayColor"
    >
        <div
            :class="cn(containerColorClasses, colorClasses ?? '')"
            @click="displayColor"
        >
            <EditorFieldColorDisplay :color="localColor" />
        </div>
        <Sketch
            v-if="displaySketch"
            v-model="colors"
            class="!absolute left-0 top-0 z-10"
            :preset-colors="presetColors"
        />
    </UiFormGroup>
</template>

<script setup lang="ts">

import type { GlitchAnimationProperty, GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
import Glitch from '~/glitch';
import { EditorDisplayedText } from '#components';

interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null
}

const glitchConfig = reactive<GlitchConfig>(getDefaultGlitchConfig());
const errors = ref<Partial<GlitchErrors>>({});
const bindings = ref<GlitchBindings>({
    message: '',
    textStyle: {
        fontSize: "",
        padding: "",
        height: "",
        backgroundColor: "",
        color: ""
    }
});

const displayedText = ref<EditorDisplayedTextData>();
const glitchedEl = ref<HTMLElement | null>(null);
const currentPercent = ref(0);
const selectedField = ref<GlitchShadowField>();

let animationDuration = glitchConfig.animation.duration;
let glitch = new Glitch(glitchConfig);

glitchConfig.preventRangesCompute = true

glitchConfig.onValidated = (errs: GlitchErrors | undefined) => {
    if (errs) {
        errors.value = errs;
    } else {
        errors.value = {};
    }
}

function bindGlitch(newBindings: any) {
    if (newBindings) {
        bindings.value = newBindings;
    }
}

function computeConfig(glitchConfig: GlitchConfig, forceRangeCompute?: boolean) {
    if (glitch && glitchedEl?.value) {
        glitch.computeConfig(glitchConfig, forceRangeCompute)
            .then(bindGlitch)
            .catch((err: Error) => {
                console.error(err);
            });
    }
}

function exportKeyframe() {
    console.log(glitch?.exportKeyframes());
}

function updateField(newField: GlitchShadowField) {
    if (glitchConfig.ranges[newField.range]) {
        const range = glitchConfig.ranges[newField.range];
        const previousField = range[newField.index - 1];
        const batch = [newField];
        const nextField = range[newField.index + 1];

        selectField(newField);

        if (previousField) {
            batch.splice(0, 0, previousField);
        }
        if (nextField) {
            batch.push(nextField);
        }

        glitch?.computeFields(batch);
    }
}

function addEmptyRange() {
    glitchConfig.ranges.push([getDefaultField(glitchConfig.ranges.length, 0, 0)]);
    computeConfig(glitchConfig, true);
}

function duplicateRange(index: number) {
    const rangeNb = glitchConfig.ranges.length;

    selectedField.value = undefined;

    if (rangeNb) {
        const rangeToCopy = deepCopy(glitchConfig.ranges[index]).map(field => {
            field.range += 1;

            return field;
        });

        if (index < (rangeNb - 1)) {
            const length = (rangeNb - 1) - index;

            for (let i = 1; i <= length; ++i) {
                glitchConfig.ranges[index + i] = glitchConfig.ranges[index + i].map(field => {
                    field.range += 1;
                    return field;
                });
            }
        }

        glitchConfig.ranges.splice(index + 1, 0, rangeToCopy);
        computeConfig(glitchConfig, true);
    }
}

function reversePositions(index: number) {
    const range = glitchConfig.ranges[index];

    if (range) {
        range.forEach((field) => {
            let key: GlitchAnimationProperty;

            for (key in field.properties) {
                const property = field.properties[key];

                if (property) {
                    property.offsetX = reverseNumber(property.offsetX);
                    property.offsetY = reverseNumber(property.offsetY);
                }
            }
        });

        computeConfig(glitchConfig, true);
    }
}

function reverseColors(index: number) {
    const range = glitchConfig.ranges[index];

    if (range) {
        range.forEach((field) => {
            let key: GlitchAnimationProperty;

            for (key in field.properties) {
                const property = field.properties[key];

                if (property) {
                    property.color.hex = reverseColor(property.color.hex);
                }
            }
        });

        computeConfig(glitchConfig, true);
    }
}

function addField(rangeIndex: number) {
    const range = glitchConfig.ranges[rangeIndex];
    const lastOffsetFrame = range[range.length - 1]?.offsetFrame;

    if (lastOffsetFrame === undefined) {
        range.push(getDefaultField(rangeIndex, range.length, 0));
    } else {
        const nextMidOffset = lastOffsetFrame < 100 ? Math.ceil((lastOffsetFrame + ((100 - lastOffsetFrame) / 2))) : 0;

        if (nextMidOffset) {
            range.push(getDefaultField(rangeIndex, range.length, nextMidOffset));
        }
    }

    computeConfig(glitchConfig, true);
}

function removeField(field: GlitchShadowField) {
    const range = glitchConfig.ranges[field.range];
    const fieldNb = range.length;
    const index = field.index;

    selectedField.value = undefined;

    if (index < (fieldNb - 1)) {
        const length = (fieldNb - 1) - index;

        for (let i = 1; i <= length; ++i) {
            range[index + i].index -= 1;
        }
    }

    if (index === 0 && fieldNb > 1) {
        range[1].offsetFrame = 0;
    }

    glitchConfig.ranges[field.range].splice(field.index, 1);
    computeConfig(glitchConfig, true);
}

function removeRange(index: number) {
    const rangeNb = glitchConfig.ranges.length;

    selectedField.value = undefined;

    if (index < (rangeNb - 1)) {
        const length = (rangeNb - 1) - index;

        for (let i = 1; i <= length; ++i) {
            glitchConfig.ranges[index + i] = glitchConfig.ranges[index + i].map(field => {
                field.range -= 1;
                return field;
            });
        }
    }

    glitchConfig.ranges.splice(index, 1);
    computeConfig(glitchConfig, true);
}

function selectField(newField: GlitchShadowField) {
    selectedField.value = newField;
}

function closeField() {
    selectedField.value = undefined;
}

watch(glitchConfig.text, () => {
    computeConfig(glitchConfig)
});

watch(glitchConfig.animation, () => {
    const configDuration = glitchConfig.animation.duration;

    if (glitch.hasAnimationBrowserCompatibility() && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);
    } else {
        computeConfig(glitchConfig)
    }
});

const onRangesEvents = {
    selectField,
    addEmptyRange,
    duplicateRange,
    reversePositions,
    reverseColors,
    addField,
    removeRange
}

onMounted(() => {
    if (displayedText.value?.glitchedEl) {
        glitchedEl.value = displayedText.value?.glitchedEl;
        glitch.setGlitchedElement(glitchedEl.value);
        computeConfig(glitchConfig, true);
    }
});

onBeforeUnmount(() => {
    if (glitch) {
        glitch.destroy();
    }
});
</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <UiHeading>{{ $t('pages.editor.title') }}</UiHeading>
            <UiButton @click="exportKeyframe">Get Keyframes</UiButton>
        </div>
        <div class="lg:flex">
            <div class="lg:w-[70%]">
                <EditorDisplayedText ref="displayedText" v-model="currentPercent" :bindings="bindings"
                    :hasControls="glitchConfig.controls" :controller="glitch.controller"
                    :animationDuration="glitchConfig.animation.duration" />
                <EditorToolboxRanges :textFontSize="glitchConfig.text.size" :hasControls="glitchConfig.controls"
                    :currentPercent="currentPercent" :ranges="glitchConfig.ranges" :selectedField="selectedField"
                    v-on="onRangesEvents" />
            </div>
            <EditorToolbox class="lg:w-[30%] lg:ml-8" v-model:config="glitchConfig" v-model:field="selectedField"
                :currentPercent="currentPercent" :errors="errors" @updateField="updateField" @removeField="removeField"
                @closeField="closeField" />
        </div>
    </div>
</template>

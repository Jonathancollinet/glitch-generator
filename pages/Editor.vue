<script setup lang="ts">

import type { GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField } from '~/glitch/types';
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
        const previousField = glitchConfig.ranges[newField.range][newField.index - 1];
        const batch = [newField];
        const nextField = glitchConfig.ranges[newField.range][newField.index + 1];

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

function duplicateRange() {
    const rangeNb = glitchConfig.ranges.length;

    if (rangeNb) {
        const rangeToCopy = deepCopy(glitchConfig.ranges[rangeNb - 1]).map(field => {
            field.range += 1;
            return field;
        });

        glitchConfig.ranges.push(rangeToCopy);
        computeConfig(glitchConfig, true);
    }
}

function addField(rangeIndex: number) {
    const range = glitchConfig.ranges[rangeIndex];
    const lastOffsetFrame = range[range.length - 1].offsetFrame;
    const nextMidOffset = lastOffsetFrame < 100 ? Math.ceil((lastOffsetFrame + ((100 - lastOffsetFrame) / 2))) : 0;

    if (nextMidOffset) {
        range.push(getDefaultField(rangeIndex, range.length, nextMidOffset));
    }

    computeConfig(glitchConfig, true);
}

function removeRange(index: number) {
    const rangeNb = glitchConfig.ranges.length;

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
        <UiCard>
            <template #content>
                <EditorDisplayedText ref="displayedText" v-model="currentPercent" :bindings="bindings"
                    :hasControls="glitchConfig.controls" :controller="glitch.controller"
                    :animationDuration="glitchConfig.animation.duration" />
            </template>
        </UiCard>
        <EditorToolbox v-model:config="glitchConfig" :currentPercent="currentPercent" :errors="errors"
            @addEmptyRange="addEmptyRange" @duplicateRange="duplicateRange" @addField="addField"
            @updateField="updateField" @removeRange="removeRange" />
    </div>
</template>

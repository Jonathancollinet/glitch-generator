<script setup lang="ts">

/*
* TODO:
* - Move field selector in Toolbox
* - Use localConfig for fields edition
* - Move Animation control in a Control component
*/


import type { GlitchBindings, GlitchConfig, GlitchErrors, GlitchShadowField, ManipulableGlitchShadowField } from '~/glitch/types';
import Glitch from '~/glitch';

const glitchConfig = reactive<GlitchConfig>(getDefaultGlitchConfig());
const errors = ref<Partial<GlitchErrors>>({});
const bindings = ref<Partial<GlitchBindings>>({});
const glitchedEl = ref<HTMLElement | null>(null);
const playState = ref<AnimationPlayState>("idle");
const selectedFields = ref<GlitchShadowField[]>([]);
const currentPercent = ref<number>(0);

let animationProperty = glitchConfig.animation.property;
let animationDuration = glitchConfig.animation.duration;
let glitch: Glitch | null = null;

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
    play();
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

let currentReq: number;
let refreshCurrentTimeFPS = 60;
let now, elapsed, then = Date.now(), fpsInterval = 1000 / refreshCurrentTimeFPS;

function bindTimelineWatcher() {
    currentReq = window.requestAnimationFrame(bindTimelineWatcher);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        const time = glitch?.getCurrentTime() as number;

        if (time) {
            currentPercent.value = (time / glitchConfig.animation.duration) * 100 % 100;
        }
    }
}

function play() {
    glitch?.play();
    playState.value = "running";

    if (glitchConfig.controls && process.client) {
        bindTimelineWatcher();
    }
}

function pause() {
    glitch?.pause();
    playState.value = "paused";
    if (glitchConfig.controls && process.client) {
        cancelAnimationFrame(currentReq);
    }

}

function selectField(field: GlitchShadowField) {
    // ctrl + click on a field
    selectedFields.value.push(field);
}

function selectUniqueField(field: GlitchShadowField) {
    // simple click on a field
    selectedFields.value.length = 0;
    selectedFields.value.push(field)
}

function shiftSelect(selectedField: GlitchShadowField) {
    const isOpened = selectedFields.value.includes(selectedField);
    if (isOpened) {
        selectedFields.value.splice(selectedFields.value.indexOf(selectedField), 1);
    }
    selectedFields.value.push(selectedField);
}

function selectPreviousFieldFrom(lastSelectedFieldIndex: number, currentFieldIndex: number, currentFieldRange: number) {
    for (let i = lastSelectedFieldIndex; i >= currentFieldIndex; --i) {
        shiftSelect(glitchConfig.ranges[currentFieldRange][i]);
    }
}

function selectNextFieldFrom(lastSelectedFieldIndex: number, currentFieldIndex: number, currentFieldRange: number) {
    for (let i = lastSelectedFieldIndex; i <= currentFieldIndex; ++i) {
        shiftSelect(glitchConfig.ranges[currentFieldRange][i]);
    }
}

function runThroughtPreviousRange(lastSelectedFieldRange: number, currentFieldRange: number, lastSelectedFieldIndex: number, currentFieldIndex: number) {
    for (let i = lastSelectedFieldRange; i >= currentFieldRange; --i) {
        let j, stop;
        if (i === lastSelectedFieldRange) {
            j = lastSelectedFieldIndex;
            stop = 0;
        } else if (i === currentFieldRange) {
            j = glitchConfig.ranges[i].length - 1;
            stop = currentFieldIndex;
        } else {
            j = glitchConfig.ranges[i].length - 1;
            stop = 0;
        }
        for (; j >= stop; --j) {
            shiftSelect(glitchConfig.ranges[i][j]);
        }
    }
}

function runThroughtNextRange(lastSelectedFieldRange: number, currentFieldRange: number, lastSelectedFieldIndex: number, currentFieldIndex: number) {
    for (let i = lastSelectedFieldRange; i <= currentFieldRange; ++i) {
        let j, stop;
        if (i === lastSelectedFieldRange) {
            j = lastSelectedFieldIndex;
            stop = glitchConfig.ranges[i].length;
        } else if (i === currentFieldRange) {
            j = 0;
            stop = currentFieldIndex + 1;
        } else {
            j = 0;
            stop = glitchConfig.ranges[i].length;
        }
        for (; j < stop; ++j) {
            shiftSelect(glitchConfig.ranges[i][j]);
        }
    }
}

function selectAllFieldsTo(field: GlitchShadowField) {
    // shift + click on a field
    if (selectedFields.value.length === 0) {
        selectField(field);
    } else {
        const currentFieldRange = field.range;
        const currentFieldIndex = field.index;
        const lastSelectField = selectedFields.value[selectedFields.value.length - 1];
        const lastSelectedFieldIndex = lastSelectField.index;
        const lastSelectedFieldRange = lastSelectField.range;

        if (currentFieldRange !== lastSelectedFieldRange) {
            if (currentFieldRange < lastSelectedFieldRange) {
                runThroughtPreviousRange(lastSelectedFieldRange, currentFieldRange, lastSelectedFieldIndex, currentFieldIndex)
            } else {
                runThroughtNextRange(lastSelectedFieldRange, currentFieldRange, lastSelectedFieldIndex, currentFieldIndex)
            }
        } else {
            // works only for the same range
            if (currentFieldIndex < lastSelectedFieldIndex) {
                selectPreviousFieldFrom(lastSelectedFieldIndex, currentFieldIndex, currentFieldRange)
            } else {
                selectNextFieldFrom(lastSelectedFieldIndex, currentFieldIndex, currentFieldRange)
            }
        }

    }

}

function deselectField(field: GlitchShadowField) {
    // ctrl + click on a selected field
    const index = selectedFields.value.findIndex((selectedField) => selectedField.range === field.range && selectedField.index === field.index);
    if (index > -1) {
        selectedFields.value.splice(index, 1);
    }
}

function selectAnimationAt(percent: number) {
    if (playState.value === "running") {
        pause();
    }
    currentPercent.value = percent;
    glitch?.selectAnimationAt(percent);
}

watch(glitchConfig.text, () => {
    computeConfig(glitchConfig)
});

watch(glitchConfig.animation, () => {
    const configProperty = glitchConfig.animation.property;
    const configDuration = glitchConfig.animation.duration;
    const propertyHasChanged = configProperty !== animationProperty;

    if (propertyHasChanged) {
        animationProperty = configProperty;
    }

    if (glitchConfig.controls && configDuration !== animationDuration) {
        animationDuration = configDuration;
        glitch?.replaceAnimationDuration(configDuration);
    } else {
        computeConfig(glitchConfig, propertyHasChanged)
    }

});

function updateFields(field: ManipulableGlitchShadowField) {
    const fields = selectedFields.value.map((selectedField) => {
        const data = {
            ...selectedField,
            ...field
        };

        if (data.property === 'nothing') {
            delete data.property;
        }

        return data;
    }) as GlitchShadowField[];

    glitch?.computeFields(fields);
}

onMounted(() => {
    if (glitchedEl.value) {
        glitch = new Glitch(glitchConfig, glitchedEl.value);
        glitchConfig.controls = glitch.hasAnimationBrowserCompatibility();
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
        <UiHeading class="text-center">{{ $t('pages.editor.title') }}</UiHeading>
        <EditorDisplayedText>
            <div class="text-center" ref="glitchedEl" :style="bindings.textStyle">
                {{ bindings.message }}
            </div>
            <template v-slot:controls>
                <EditorAnimationTimeline :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
                <EditorControls :playState="playState" @play="play()" @pause="pause()" />
            </template>
        </EditorDisplayedText>
        <EditorToolbox v-model="glitchConfig" :errors="errors" :selectedFields="selectedFields"
            @selectUniqueField="selectUniqueField" @selectAllFieldsTo="selectAllFieldsTo" @deselectField="deselectField"
            @selectField="selectField">
            <EditorFieldOptions v-if="selectedFields.length" :config="glitchConfig" :errors="errors" :selectedFields="selectedFields" @update="updateFields" />
        </EditorToolbox>
        <EditorExporter :config="glitchConfig" />
    </div>
</template>

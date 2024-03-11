<script lang="ts" setup>
import type GlitchController from '~/glitch/controller';

const props = defineProps<{
    controller: GlitchController,
    animationDuration: number
}>()

const currentPercent = defineModel<number>({ required: true });

let currentReq: number;
let now, elapsed, then = Date.now();

const playState = ref<AnimationPlayState>("idle");
const precision = ref(100);
const fps = ref(144);

const fpsInterval = computed(() => 1000 / fps.value);

function selectAnimationAt(percent: number) {
    if (props.controller) {
        if (isRunning.value) {
            pause();
        }
        currentPercent.value = percent;
        props.controller?.selectAnimationAt(percent);
    }
}

function bindTimelineWatcher() {
    if (isRunning.value) {
        currentReq = window.requestAnimationFrame(bindTimelineWatcher);
        now = Date.now();
        elapsed = now - then;
        const fps = fpsInterval.value;

        if (elapsed > fps) {
            then = now - (elapsed % fps);

            const time = props.controller?.getCurrentTime() as number;

            if (time) {
                currentPercent.value = time / props.animationDuration * 100 % 100;
            }
        }
    }
}

function play() {
    if (props.controller) {
        props.controller.play();
        playState.value = props.controller.getPlayState();

        if (process.client) {
            bindTimelineWatcher();
        }
    }
}

function pause() {
    if (props.controller) {
        props.controller.pause();
        playState.value = props.controller.getPlayState();

        if (process.client) {
            cancelAnimationFrame(currentReq);
        }
    }
}

function forward() {
    if (props.controller) {
        currentPercent.value += 1;
        props.controller?.selectAnimationAt(currentPercent.value);
    }
}

function backward() {
    if (props.controller) {
        currentPercent.value -= 1;
        props.controller?.selectAnimationAt(currentPercent.value);
    }
}

const isRunning = computed(() => playState.value === "running");

const actions = {
    play,
    pause,
    forward,
    backward
}

onMounted(() => {
    play();
});
</script>

<template>
    <EditorKeyframesTimeline data-v-step="2" :precision="precision" :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
    <EditorKeyframesActions :playState="playState" v-model:precision="precision" v-model:fps="fps" v-on="actions" @play="play()" @pause="pause()" />
</template>

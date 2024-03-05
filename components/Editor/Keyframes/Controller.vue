<script lang="ts" setup>
import type GlitchController from '~/glitch/controller';

const props = defineProps<{
    controller: GlitchController,
    animationDuration: number
}>()

const currentPercent = defineModel<number>({ required: true });

let currentReq: number;
let now, elapsed, then = Date.now();

const refreshCurrentTimeFPS = 75;
const fpsInterval = 1000 / refreshCurrentTimeFPS
const playState = ref<AnimationPlayState>("idle");
const precision = ref(1);

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

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);

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
    <EditorKeyframesTimeline :precision="precision" :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
    <EditorKeyframesActions :playState="playState" v-model="precision" v-on="actions" @play="play()" @pause="pause()" />
</template>

<script lang="ts" setup>
import type GlitchController from '~/glitch/controller';

const props = defineProps<{
    controller: GlitchController,
    animationDuration: number
}>()

const currentPercent = defineModel<number>({ required: true });

let currentReq: number;
let now, elapsed, then = Date.now();

const refreshCurrentTimeFPS = 60;
const fpsInterval = 1000 / refreshCurrentTimeFPS
const playState = ref<AnimationPlayState>("idle");

const isRunning = computed(() => playState.value === "running");

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

onMounted(() => {
    play();
});
</script>

<template>
    <EditorKeyframesTimeline :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
    <EditorKeyframesActions :playState="playState" @play="play()" @pause="pause()" />
</template>

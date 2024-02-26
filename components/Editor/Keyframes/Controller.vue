<script lang="ts" setup>
import type GlitchController from '~/glitch/controller';

const props = defineProps<{
    controller: GlitchController,
    animationDuration: number
}>()

let currentReq: number;
let now, elapsed, then = Date.now();

const refreshCurrentTimeFPS = 60;
const fpsInterval = 1000 / refreshCurrentTimeFPS
const currentPercent = ref<number>(0);

function selectAnimationAt(percent: number) {
    if (props.controller.getPlayState() === "running") {
        pause();
    }
    currentPercent.value = percent;
    props.controller?.selectAnimationAt(percent);
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
    props.controller?.play();

    if (process.client) {
        bindTimelineWatcher();
    }
}

function pause() {
    props.controller?.pause();

    if (process.client) {
        cancelAnimationFrame(currentReq);
    }
}

onMounted(() => {
    play();
});
</script>

<template>
    <EditorKeyframesTimeline :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
    <EditorKeyframesActions :playState="controller.getPlayState()" @play="play()" @pause="pause()" />
</template>

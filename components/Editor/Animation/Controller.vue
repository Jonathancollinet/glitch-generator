<script lang="ts" setup>
import type Glitch from '~/glitch';
import type { GlitchConfig } from '~/glitch/types';

const props = defineProps<{
    glitch: Glitch,
    glitchConfig: GlitchConfig
}>()

let currentReq: number;
let refreshCurrentTimeFPS = 60;
let now, elapsed, then = Date.now(), fpsInterval = 1000 / refreshCurrentTimeFPS;
const playState = ref<AnimationPlayState>("idle");
const currentPercent = ref<number>(0);

function selectAnimationAt(percent: number) {
    if (playState.value === "running") {
        pause();
    }
    currentPercent.value = percent;
    props.glitch?.selectAnimationAt(percent);
}

function bindTimelineWatcher() {
    currentReq = window.requestAnimationFrame(bindTimelineWatcher);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        const time = props.glitch?.getCurrentTime() as number;

        if (time) {
            currentPercent.value = time / props.glitchConfig.animation.duration * 100 % 100;
        }
    }
}

function play() {
    props.glitch?.play();
    playState.value = "running";

    if (process.client) {
        bindTimelineWatcher();
    }
}

function pause() {
    props.glitch?.pause();
    playState.value = "paused";

    if (process.client) {
        cancelAnimationFrame(currentReq);
    }
}

onMounted(() => {
    play();
});
</script>

<template>
    <EditorAnimationTimeline :currentPercent="currentPercent" @selectAnimationAt="selectAnimationAt" />
    <EditorAnimationControls :playState="playState" @play="play()" @pause="pause()" />
</template>

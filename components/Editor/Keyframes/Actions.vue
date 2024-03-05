<script lang="ts" setup>
import { Icons } from '~/types/enums';

const props = defineProps<{
    playState: AnimationPlayState | undefined
}>()

const isRunning = computed(() => props.playState === 'running');
const isPaused = computed(() => props.playState === 'paused' || props.playState === 'idle');

const emit = defineEmits<{
    play: []
    pause: [],
    forward: [],
    backward: []
}>()
</script>

<template>
    <div class="flex items-center justify-around w-[55px]">
        <!-- <UiButton variant="outline" size="icon" :disabled="!playState || isRunning" @click="emit('backward')">
            <UiIcon :icon="Icons.Backward" />
        </UiButton> -->
        <UiButton variant="icon" size="icon" :disabled="!playState || isRunning" @click="emit('play')">
            <UiIcon :icon="Icons.Play" />
        </UiButton>
        <UiButton variant="icon" size="icon" :disabled="!playState || isPaused" @click="emit('pause')">
            <UiIcon :icon="Icons.Pause" />
        </UiButton>
        <!-- <UiButton variant="outline" size="icon" :disabled="!playState || isRunning" @click="emit('forward')">
            <UiIcon :icon="Icons.Forward" />
        </UiButton> -->
    </div>
</template>

<style></style>
<script lang="ts" setup>
import { Icons } from '~/types/enums';

const props = defineProps<{
    playState: AnimationPlayState | undefined
}>()

const isRunning = computed(() => props.playState === 'running');
const isPaused = computed(() => props.playState === 'paused' || props.playState === 'idle');

const emit = defineEmits<{
    play: []
    pause: []
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <UiButton variant="outline" size="icon" :disabled="!playState || isRunning" @click="emit('play')">
        <UiIcon :icon="Icons.Play" />
    </UiButton>
    <UiButton variant="outline" size="icon" :disabled="!playState || isPaused" @click="emit('pause')">
        <UiIcon :icon="Icons.Pause" />
    </UiButton>
  </div>
</template>

<style>

</style>
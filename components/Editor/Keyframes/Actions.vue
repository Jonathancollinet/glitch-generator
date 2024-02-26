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
    <UiButton variant="outline" size="icon" :disabled="!playState || isRunning">
        <UiIcon :icon="Icons.Play" @click="emit('play')" />
    </UiButton>
    <UiButton variant="outline" size="icon" :disabled="!playState || isPaused">
        <UiIcon :icon="Icons.Pause" @click="emit('pause')" />
    </UiButton>
  </div>
</template>

<style>

</style>
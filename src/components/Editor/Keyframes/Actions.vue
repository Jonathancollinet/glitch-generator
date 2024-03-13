<script lang="ts" setup>
import { Icons } from '~/types/enums';

const props = defineProps<{
    playState: AnimationPlayState | undefined
}>()

const emit = defineEmits<{
    play: []
    pause: []
}>()

const isRunning = computed(() => props.playState === 'running');
const isPaused = computed(() => props.playState === 'paused' || props.playState === 'idle');

</script>

<template>
    <div class="flex items-center justify-around w-[55px]">
        <div class="flex">
            <UiButton variant="icon" size="icon" :disabled="!playState || isRunning" @click="emit('play')">
                <UiIcon :icon="Icons.Play" />
            </UiButton>
            <UiButton variant="icon" size="icon" :disabled="!playState || isPaused" @click="emit('pause')">
                <UiIcon :icon="Icons.Pause" />
            </UiButton>
        </div>
    </div>
</template>

<style></style>
<script lang="ts" setup>
import { Icons } from '~/types/enums';

const props = defineProps<{
    playState: AnimationPlayState | undefined
}>()

const emit = defineEmits<{
    play: []
    pause: [],
    forward: [],
    backward: []
}>()

const precision = defineModel<number>('precision', { required: true });
const fps = defineModel<number>('fps', { required: true });

const isRunning = computed(() => props.playState === 'running');
const isPaused = computed(() => props.playState === 'paused' || props.playState === 'idle');

const applyPrecision = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;

    precision.value = Number(value);
}

const updateFps = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;

    fps.value = Number(value);
}
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
        <!-- <div class="flex items-center">
            <select :value="precision" @change="applyPrecision" class="rounded-md border border-gray-300 bg-white text-sm text-gray-700">
                <option value="1">1</option>
                <option value="10">0.1</option>
                <option value="100">0.01</option>
            </select>
            <select :value="fps" @change="updateFps" class="rounded-md border border-gray-300 bg-white text-sm text-gray-700">
                <option value="60">60</option>
                <option value="75">75</option>
                <option value="120">120</option>
                <option value="144">144</option>
                <option value="240">240</option>
                <option value="360">360</option>
            </select>
        </div> -->
    </div>
</template>

<style></style>
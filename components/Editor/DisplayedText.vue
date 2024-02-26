<script setup lang="ts">
import type GlitchController from '~/glitch/controller';
import type { GlitchBindings, GlitchConfig } from '~/glitch/types';

const glitchedEl = ref<HTMLElement | null>(null);

defineProps<{
    hasControls: boolean,
    controller: GlitchController,
    animationDuration: number,
    bindings: GlitchBindings,
}>()

defineExpose({
    glitchedEl
})
</script>

<template>
    <div class="relative w-full h-[100vw] bg-blue-100 min-h-72 max-h-[80vh]">
        <div class="flex h-full items-center justify-center select-none overflow-hidden">
            <div class="text-center" ref="glitchedEl" :style="bindings.textStyle">
                {{ bindings.message }}
            </div>
        </div>
        <ClientOnly>
            <div class="absolute w-full bottom-1 flex flex-col justify-center items-center"
                v-if="controller && hasControls">
                <EditorKeyframesController :controller="controller" :animationDuration="animationDuration" />
            </div>
        </ClientOnly>
    </div>
</template>

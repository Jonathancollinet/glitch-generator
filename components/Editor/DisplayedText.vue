<script setup lang="ts">
import type Glitch from '~/glitch';
import type { GlitchBindings, GlitchConfig } from '~/glitch/types';

const glitchedEl = ref<HTMLElement | null>(null);

defineProps<{
    glitch: Glitch,
    glitchConfig: GlitchConfig,
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
        <div class="absolute w-full bottom-1 flex flex-col justify-center items-center" v-if="glitch && glitchConfig.controls">
            <EditorAnimationController :glitch="glitch" :glitchConfig="glitchConfig" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type GlitchController from '~/glitch/controller';
import type { GlitchBindings, GlitchConfig } from '~/glitch/types';

const glitchedEl = ref<HTMLElement | null>(null);

defineProps<{
    hasControls: boolean,
    controller: GlitchController | null,
    animationDuration: number,
    bindings: GlitchBindings,
}>()

const currentPercent = defineModel<number>({ required: true });

defineExpose({
    glitchedEl
})
</script>

<template>
    <UiCard class="dark:bg-transparent">
        <template #content>
            <div class="relative h-[50vw] min-h-72 max-h-[400px] lg:max-h-[500px]">
                <div class="flex h-full items-center justify-center select-none overflow-hidden">
                    <div class="flex items-center justify-center h-0" ref="glitchedEl" :style="bindings.textStyle">
                        {{ bindings.message }}
                    </div>
                </div>
                <ClientOnly>
                    <div class="absolute w-full bottom-1 flex flex-col justify-center items-center"
                        v-if="controller && hasControls">
                        <EditorKeyframesController v-model="currentPercent" :controller="controller"
                            :animationDuration="animationDuration" />
                    </div>
                </ClientOnly>
            </div>
        </template>
    </UiCard>
</template>

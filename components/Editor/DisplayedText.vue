<script setup lang="ts">
import type GlitchController from '~/glitch/controller';
import type { GlitchBindings, GlitchConfig } from '~/glitch/types';

const glitchedEl = ref<HTMLElement | null>(null);

const props = defineProps<{
    config: GlitchConfig,
    controller: GlitchController | null,
    bindings: GlitchBindings,
}>()

const currentPercent = defineModel<number>({ required: true });

const hasControls = computed(() => props.config.controls);
const animationDuration = computed(() => props.config.animation.duration);

defineExpose({
    glitchedEl
})
</script>

<template>
    <UiCard noContentPad class="bg-primary-50 dark:bg-neutral-900">
        <template #content>
            <div class="relative h-[50vw] min-h-72 max-h-[400px] lg:max-h-[500px]">
                <div class="flex h-full items-center justify-center select-none overflow-hidden">
                    <div class="displayedText flex items-center justify-center h-0" ref="glitchedEl" :style="bindings.textStyle">
                        {{ bindings.message }}
                    </div>
                </div>
                <ClientOnly>
                    <div data-v-step="2" class="absolute w-full bottom-4 flex flex-col justify-center items-center"
                        v-if="controller && hasControls">
                        <EditorKeyframesController v-model="currentPercent" :controller="controller"
                            :animationDuration="animationDuration" />
                    </div>
                </ClientOnly>
            </div>
        </template>
    </UiCard>
</template>

<style scoped>
.displayedText {
    font-family: "Signika Negative", sans-serif;
}
</style>
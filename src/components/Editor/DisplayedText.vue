<script setup lang="ts">
import type GlitchController from '~/glitch/controller';
import type { GlitchBindings, GlitchConfig } from '~/glitch/types';

const glitchedEl = ref<HTMLElement | null>(null);

const props = defineProps<{
    config: GlitchConfig,
    controller: GlitchController | null,
    bindings: GlitchBindings,
    hasValidDuration: boolean
}>();

const currentPercent = defineModel<number>({ required: true });

const hasControls = computed(() => props.config.controls);
const animationDuration = computed(() => props.config.animation.duration);

defineExpose({
    glitchedEl
});
</script>

<template>
    <UiCard noContentPad class="bg-primary-50 dark:bg-neutral-800">
        <template #content>
            <div class="relative h-[50vw] min-h-72 md:max-h-[400px] lg:max-h-[500px] xl:max-h-[50vh]">
                <div class="flex h-full items-center justify-center select-none overflow-hidden">
                    <div class="displayedText flex text-center items-center justify-center h-0" ref="glitchedEl" :style="bindings.textStyle">
                        {{ bindings.message }}
                    </div>
                </div>
                <ClientOnly>
                    <div class="absolute w-full bottom-4 flex flex-col justify-center items-center"
                        v-if="controller && hasControls && hasValidDuration">
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
<script setup lang="ts">
import type GlitchController from "~/lib/glitch/controller";
import G from "~/lib/glitch/types";

const glitchedEl = ref<HTMLElement | null>(null);

const props = defineProps<{
    config: G.Config;
    controller: GlitchController | null;
    bindings: G.Bindings;
    hasValidDuration: boolean;
}>();

const currentPercent = defineModel<number>({ required: true });

const hasControls = computed(() => props.config.controls);
const animationDuration = computed(() => props.config.animation.duration);

defineExpose({
    glitchedEl,
});
</script>

<template>
    <UiCard no-content-pad class="bg-primary-50 dark:bg-neutral-800">
        <template #content>
            <div
                class="relative h-[50vw] min-h-72 md:max-h-[400px] lg:max-h-[500px] xl:max-h-[50vh]"
            >
                <div
                    class="flex h-full select-none items-center justify-center overflow-hidden"
                >
                    <div
                        ref="glitchedEl"
                        class="displayedText flex h-0 items-center justify-center text-center"
                        :style="bindings.textStyle"
                    >
                        {{ bindings.message }}
                    </div>
                </div>
                <ClientOnly>
                    <div
                        v-if="controller && hasControls && hasValidDuration"
                        class="absolute bottom-4 flex w-full flex-col items-center justify-center"
                    >
                        <EditorKeyframesController
                            v-model="currentPercent"
                            :controller="controller"
                            :animation-duration="animationDuration"
                        />
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

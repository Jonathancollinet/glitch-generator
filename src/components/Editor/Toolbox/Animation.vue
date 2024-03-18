<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { getErrorMessage, applyUpdater } from "~/lib/toolbox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
}>();

const animation = defineModel<G.Animation>("config", { required: true });
const localAnimation = defineModel<G.Animation>("localConfig", {
    required: true,
});

const animationDurationError = computed(() => getErrorMessage(props.errors, "animation.duration"));

const updateAnimation = computed(() =>
    applyUpdater<G.Animation>({
        obj: animation.value,
        localObj: localAnimation.value,
    }),
);

const updateAnimationDuration = computed(() =>
    updateAnimation.value({
        key: "duration",
        modifier: Number,
        debounced: 300,
    }),
);
</script>

<template>
    <UiCard openable :is-open="false" content-classes="pr-0">
        <template #title>
            <UiHeading variant="h3">
                {{ $t("pages.editor.config.animation.title") }}
            </UiHeading>
        </template>

        <template #content>
            <UiFormGroup
                inline
                label="pages.editor.config.animation.animationDuration"
                :error="animationDurationError"
                name="animationDuration"
            >
                <UiInput
                    type="tel"
                    class="w-[70px]"
                    alignment="center"
                    size="medium"
                    :on-update="updateAnimationDuration"
                    name="animationDuration"
                    :model-value="localAnimation.duration"
                />
            </UiFormGroup>
        </template>
    </UiCard>
</template>

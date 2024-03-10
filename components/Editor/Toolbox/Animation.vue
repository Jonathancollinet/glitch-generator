<script lang="ts" setup>
import type { GlitchAnimation, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const animation = defineModel<GlitchAnimation>('config', { required: true });
const localAnimation = defineModel<GlitchAnimation>('localConfig', { required: true });

const animationDurationError = computed(() => getErrorMessage(props.errors, 'animation.duration'));

const updateAnimationDuration = applyUpdater<GlitchAnimation>({
    obj: animation.value,
    localObj: localAnimation.value,
    key: 'duration',
    modifier: Number,
    debounced: 500
});

</script>

<template>
    <UiCard openable :isOpen="false">
        <template #title>
            <UiHeading variant="h3">{{ $t('pages.editor.config.animation.title') }}</UiHeading>
        </template>

        <template #content>
            <UiFormGroup inline label="pages.editor.config.animation.animationDuration" :error="animationDurationError"
                name="animationDuration">
                <UiInput type="tel" class="w-[70px]" alignment="center" size="medium"
                    :onUpdate="updateAnimationDuration" name="animationDuration"
                    :modelValue="localAnimation.duration" />
            </UiFormGroup>
        </template>
    </UiCard>
</template>

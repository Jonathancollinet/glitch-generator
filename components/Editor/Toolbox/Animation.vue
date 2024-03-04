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
    modifier: Number
});

</script>

<template>
    <UiCard>
        <template #title>
            <UiHeading variant="h3">{{ $t('pages.editor.config.animation.title') }}</UiHeading>
        </template>

        <template #content>
            <UiFormGroup label="pages.editor.config.animation.animationDuration" :error="animationDurationError"
                name="animationDuration">
                <UiInput size="medium" :debounceFn="updateAnimationDuration" name="animationDuration"
                    :modelValue="localAnimation.duration" />
            </UiFormGroup>
        </template>
    </UiCard>
</template>

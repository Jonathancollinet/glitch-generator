<script lang="ts" setup>
import type { GlitchAnimation, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const animation = defineModel<GlitchAnimation>('config', { required: true });
const localAnimation = defineModel<GlitchAnimation>('localConfig', { required: true });

const animationDurationError = computed(() => getErrorMessage(props.errors, 'animation.duration'));
const animationPropertyError = computed(() => getErrorMessage(props.errors, 'animation.property'));

const updateAnimationDuration = applyUpdater<GlitchAnimation>({
    obj: animation.value,
    key: 'duration',
    modifier: Number
});

const updateAnimationProperty = applyUpdater<GlitchAnimation>({
    obj: animation.value,
    key: 'property',
    debounced: 300
});

</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.animationDuration" :error="animationDurationError" name="animationDuration">
            <UiInput debounce :debounceTime="100" :debounceFn="updateAnimationDuration" name="animationDuration"
                :modelValue="localAnimation.duration" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.animationProperty" :error="animationPropertyError" name="animationProperty">
            <select name="animationProperty" id="animationProperty" :value="localAnimation.property"
                @change="updateAnimationProperty">
                <option value="text-shadow">text-shadow</option>
                <option value="box-shadow">box-shadow</option>
            </select>
        </UiFormGroup>
    </div>
</template>

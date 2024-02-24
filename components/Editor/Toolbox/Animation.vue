<script lang="ts" setup>
import type { GlitchAnimation, GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const config = defineModel<GlitchAnimation>('config', { required: true });
const localConfig = defineModel<GlitchAnimation>('localConfig', { required: true });

const props = defineProps<{
    errors: Partial<GlitchErrors>,
}>()

const animationDurationError = computed(() => getErrorMessage(props.errors, 'animation.duration'));
const animationPropertyError = computed(() => getErrorMessage(props.errors, 'animation.property'));

const updateAnimationDuration = applyUpdater<GlitchAnimation>({
    obj: config.value,
    key: 'duration',
    modifier: Number
});

const updateAnimationProperty = applyUpdater<GlitchAnimation>({
    obj: config.value,
    key: 'property',
    debounced: 100
});

</script>

<template>
    <div>
        <UiFormGroup label="pages.editor.config.animationDuration" :error="animationDurationError" name="animationDuration">
            <UiInput debounce :debounceTime="100" :debounceFn="updateAnimationDuration" name="animationDuration"
                :modelValue="localConfig.duration" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.animationProperty" :error="animationPropertyError" name="animationProperty">
            <select name="animationProperty" id="animationProperty" :value="localConfig.property"
                @change="updateAnimationProperty">
                <option value="text-shadow">text-shadow</option>
                <option value="box-shadow">box-shadow</option>
            </select>
        </UiFormGroup>
    </div>
</template>

<script setup lang="ts">
import type { GlitchConfig } from '~/plugins/glitch/types';

const config = defineModel<GlitchConfig>({ type: Object });

defineProps<{
    // to do -> refine parent to fit with the new directive
    errors: any
}>()

function updateConfig(propertyKey: string) {
    return (value: string) => {
        // config.value[propertyKey] = value;
    }
}

</script>

<template>
    <div v-if="config">
        <!-- <UiFormGroup label="pages.editor.config.fontSize" :error="errors.fontSize" name="fontSize">
            <UiInput debounce :debounceTime="300" :debounceFn="updateConfig('fontSize')" name="fontSize" :modelValue="getValue('fontSize')" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.color" :error="errors.color" name="color">
            <UiInput type="text" debounce :debounceTime="300" :debounceFn="updateConfig('color')" name="color" :modelValue="getValue('color')" />
        </UiFormGroup> -->
    </div>
    <div v-else>
        Oops.. config is not defined :/
    </div>
</template>

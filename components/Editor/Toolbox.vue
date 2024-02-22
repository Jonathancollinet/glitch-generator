<script setup lang="ts">
import type { GlitchConfig, GlitchErrors } from '~/plugins/glitch/types';

const config = defineModel<GlitchConfig>({ type: Object });

const props = defineProps<{
    errors: Partial<GlitchErrors>
}>()

function getErrorMessage(errors: Partial<GlitchErrors>, path: string) {
    const e = errors[path];

    if (e) {
        return `${e.path}-${e.code}`;
    }

}

const textSizeError = computed(() => getErrorMessage(props.errors, 'text.size'));
const messageError = computed(() => getErrorMessage(props.errors, 'text.message'));

const localConfig = ref<GlitchConfig>(JSON.parse(JSON.stringify(config.value)));

function updateTextSize(value: string) {
    if (localConfig.value && config.value && value) {
        config.value.text.size = Number(value);
    }
}
function updateMessage(value: string) {
    if (localConfig.value && config.value && value) {
        config.value.text.message = value;
    }
}

</script>

<template>
    <div v-if="config">
        <UiFormGroup label="pages.editor.config.fontSize" :error="textSizeError" name="fontSize">
            <UiInput debounce :debounceTime="100" :debounceFn="updateTextSize" name="fontSize" :modelValue="localConfig.text.size" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.message" :error="messageError" name="message">
            <UiInput debounce :debounceTime="100" :debounceFn="updateMessage" name="message" :modelValue="localConfig.text.message" />
        </UiFormGroup>
        <!-- <UiFormGroup label="pages.editor.config.color" :error="errors.color" name="color">
            <UiInput type="text" debounce :debounceTime="300" :debounceFn="updateConfig('color')" name="color" :modelValue="getValue('color')" />
        </UiFormGroup> -->
    </div>
    <div v-else>
        Oops.. config is not defined :/
    </div>
</template>

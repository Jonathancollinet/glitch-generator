<script setup lang="ts">
import type { GlitchConfig, GlitchErrors } from '~/plugins/glitch/types';
import vueDebounce, { debounce } from 'vue-debounce';

const config = defineModel<GlitchConfig>({ type: Object });
const vDebounce = vueDebounce({});

const props = defineProps<{
    errors: Partial<GlitchErrors>
}>()

const localConfig = ref<GlitchConfig>(JSON.parse(JSON.stringify(config.value)));

interface UpdateParams<Container, Value> {
    obj: Record<keyof Container, string | number | object>,
    localObj: Record<keyof Container, string | number | object>,
    key: keyof Container,
    modifier: (v: string) => string | number,
    value: Value
}

function getErrorMessage(errors: Partial<GlitchErrors>, path: string) {
    const e = errors[path];

    if (e) {
        return `${e.path}-${e.code}`;
    }
}

function applyModifier<Container>({obj, localObj, key, modifier = (v) => v, value}: UpdateParams<Container, string>) {
    const modifiedValue = modifier(value);

    obj[key] = modifiedValue;
    localObj[key] = modifiedValue;
}

function updateValue<Container>({obj, localObj, key, modifier = (v) => v, value}: UpdateParams<Container, string | Event>) {
    if (value instanceof Event) {
        const targetValue = (value.target as HTMLInputElement)?.value;

        if (targetValue) {
            applyModifier<Container>({obj, localObj, key, modifier, value: targetValue});
        }
    } else {
        applyModifier({obj, localObj, key, modifier, value});
    }
}

function applyUpdater<Container>(
    obj: Record<keyof Container, string | number | object> | undefined,
    localObj: Record<keyof Container, string | number | object> | undefined,
    key: keyof Container,
    modifier: (v: string) => string | number = (v) => v,
    debounced?: number
) {
    if (obj && localObj) {
        if (debounced) {
            return debounce((value: string | Event) => updateValue({obj, localObj, key, modifier, value}), debounced);
        }
        return (value: string | Event) => updateValue({obj, localObj, key, modifier, value});
    }
}

const textSizeError = computed(() => getErrorMessage(props.errors, 'text.size'));
const textUnitError = computed(() => getErrorMessage(props.errors, 'text.unit'));
const textMessageError = computed(() => getErrorMessage(props.errors, 'text.message'));
const textColorHexError = computed(() => getErrorMessage(props.errors, 'text.color.hex'));
const textColorAlphaPercentError = computed(() => getErrorMessage(props.errors, 'text.color.alphaPercent'));

const updateTextSize = applyUpdater(config.value?.text, localConfig.value?.text, 'size', Number);
const updateTextUnit = applyUpdater(config.value?.text, localConfig.value?.text, 'unit', undefined, 100);
const updateMessage = applyUpdater(config.value?.text, localConfig.value?.text, 'message');
const updateTextColorHex = applyUpdater(config.value?.text.color, localConfig.value?.text.color, 'hex', undefined, 100);
const updateTextColorAlphaPercent = applyUpdater(config.value?.text.color, localConfig.value?.text.color, 'alphaPercent', Number);

</script>

<template>
    <div v-if="config">
        <UiFormGroup label="pages.editor.config.textSize" :error="textSizeError" name="textSize">
            <UiInput debounce :debounceTime="100" :debounceFn="updateTextSize" name="textSize"
                :modelValue="localConfig.text.size" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textUnit" :error="textUnitError" name="textUnit">
            <select name="textUnit" id="textUnit" :value="config.text.unit" @change="updateTextUnit">
                <option value="px">px</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
            </select>
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.message" :error="textMessageError" name="message">
            <UiInput debounce :debounceTime="100" :debounceFn="updateMessage" name="message"
                :modelValue="localConfig.text.message" />
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textColorHex" :error="textColorHexError" name="textColorHex">
            <input type="color" id="textColorHex" name="textColorHex" :value="config.text.color.hex"
                @input="updateTextColorHex">
        </UiFormGroup>
        <UiFormGroup label="pages.editor.config.textColorAlphaPercent" :error="textColorAlphaPercentError"
            name="textColorAlphaPercent">
            <input type="range" step="1" min="0" max="100" id="textColorAlphaPercent" name="textColorAlphaPercent"
                :value="config.text.color.alphaPercent" @input="updateTextColorAlphaPercent">
        </UiFormGroup>
    </div>
    <div v-else>
        Oops.. config is not defined :/
    </div>
</template>

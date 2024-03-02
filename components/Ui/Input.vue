<script lang="ts" setup>
import { type InputVariantsProps, InputVariants } from '~/componentsVariants/Ui/Input';
import vueDebounce from 'vue-debounce';
import type { HTMLAttributes } from 'vue';

const vDebounce = vueDebounce({});

type acceptedTypes = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url' | 'color';

const props = withDefaults(defineProps<{
    variant?: InputVariantsProps['variant'],
    alignment?: InputVariantsProps['alignment'],
    size?: InputVariantsProps['size'],
    type?: acceptedTypes,
    name: string,
    class?: HTMLAttributes['class'],
    debounceFn?: (value: any) => void,
}>(), {
    type: 'text',
    debounce: false,
});

const modelValue = defineModel();

const isColor = computed(() => props.type === 'color');

function updateModelValue(e: Event) {
    if (props.debounceFn) {
        props.debounceFn(e);
    } else {
        modelValue.value = (e.target as HTMLInputElement)?.value;
    }
}
</script>

<template>
    <input :class="cn(isColor ? 'cursor-pointer': '', InputVariants({ variant, alignment, size }), props.class ?? '')" :type="type" :id="name" :name="name"
        :value="modelValue" @input="updateModelValue">
</template>

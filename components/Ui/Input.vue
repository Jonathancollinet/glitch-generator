<script lang="ts" setup>
import { type InputVariantsProps, InputVariants } from '~/componentsVariants/Ui/Input';
import type { HTMLAttributes } from 'vue';

type acceptedTypes = 'textarea' | 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url' | 'color';

const props = withDefaults(defineProps<{
    variant?: InputVariantsProps['variant'],
    alignment?: InputVariantsProps['alignment'],
    size?: InputVariantsProps['size'],
    type?: acceptedTypes,
    name: string,
    readonly?: boolean,
    class?: HTMLAttributes['class'],
    onUpdate?: (value: any) => void,
}>(), {
    type: 'text',
    debounce: false,
    readonly: false
});

const modelValue = defineModel<string | number>();

function updateModelValue(e: Event) {
    if (props.onUpdate) {
        props.onUpdate(e);
    } else {
        modelValue.value = (e.target as HTMLInputElement)?.value;
    }
}

const isColor = computed(() => props.type === 'color');
const isTextArea = computed(() => props.type === 'textarea');
</script>

<template>
    <textarea v-if="isTextArea" :readonly="readonly"
        :class="cn('resize', isColor ? 'cursor-pointer' : '', InputVariants({ variant, alignment, size }), props.class ?? '')"
        autocomplete="off" :type="type" :id="name" :name="name" :value="modelValue" @input="updateModelValue" />
    <input v-else :readonly="readonly"
        :class="cn(isColor ? 'cursor-pointer' : '', InputVariants({ variant, alignment, size }), props.class ?? '')"
        autocomplete="off" :type="type" :id="name" :name="name" :value="modelValue" @input="updateModelValue">
</template>

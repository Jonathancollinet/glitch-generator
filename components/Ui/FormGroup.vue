<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { FormGroupVariants, type FormGroupVariantsProps } from '~/componentsVariants/Ui/FormGroup';

const props = defineProps<{
    variant?: FormGroupVariantsProps['variant']
    size?: FormGroupVariantsProps['size']
    alignment?: FormGroupVariantsProps['alignment']
    class?: HTMLAttributes['class'],
    label?: string,
    name: string,
    error?: string,
}>();
</script>

<template>
    <div :class="cn(FormGroupVariants({ variant, alignment, size }), props.class ?? '')">
        <slot name="before" />
        <label class="select-none block" v-if="label" :for="name">{{ $t(label) }}</label>
        <slot />
        <UiText v-if="error" as="div" class="text-xs mt-1 text-red-600 italic">{{ $t(error) }}</UiText>
    </div>
</template>
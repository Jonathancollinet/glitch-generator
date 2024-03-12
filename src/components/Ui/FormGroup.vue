<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { FormGroupVariants, type FormGroupVariantsProps } from '~/componentsVariants/Ui/FormGroup';

const props = defineProps<{
    variant?: FormGroupVariantsProps['variant']
    size?: FormGroupVariantsProps['size']
    alignment?: FormGroupVariantsProps['alignment']
    class?: HTMLAttributes['class'],
    label?: string,
    name?: string,
    error?: string,
    inline?: boolean,
}>();
</script>

<template>
    <div :class="cn('FormGroup group/fg', FormGroupVariants({ variant, alignment, size }), props.class ?? '')">
        <slot name="before" />
        <template v-if="inline">
            <div class="flex items-center justify-between">
                <label class="min-w-[40px] select-none block text-left text-neutral-500 dark:text-neutral-400" v-if="label" :for="name">{{ $t(label) }}</label>
                <div class="flex items-center justify-end">
                    <slot />
                </div>
            </div>
            <UiText v-if="error" as="div" class="text-xs mt-1 text-red-600 italic">{{ $t(error) }}</UiText>
        </template>
        <template v-else>
            <label class="select-none block pl-1 first:pl-0" v-if="label" :for="name">{{ $t(label) }}</label>
            <slot />
            <UiText v-if="error" as="div" class="text-xs mt-1 text-red-600 italic">{{ $t(error) }}</UiText>
        </template>
    </div>
</template>

<style scoped>
.FormGroup {
    font-family: "Signika Negative", sans-serif;
}
</style>
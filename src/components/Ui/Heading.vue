<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { HeadingVariants, type HeadingVariantsProps } from '~/componentsVariants/Ui/Heading';

const props = withDefaults(defineProps<{
    variant?: HeadingVariantsProps['variant'],
    class?: HTMLAttributes['class'],
}>(), {
    variant: 'h1'
});
</script>

<template>
    <component
        :is="variant"
        :class="cn(HeadingVariants({ variant }), props.class ?? '')">
        <slot />
    </component>
</template>

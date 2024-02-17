<script lang="ts" setup>
import { HeadingVariants, type HeadingVariantsProps } from '~/componentsVariants/Ui/Heading';

withDefaults(defineProps<{
    variant?: HeadingVariantsProps['variant']
}>(), {
    variant: 'h1'
});
</script>

<template>
    <component
        :is="variant"
        :class="cn(HeadingVariants({ variant }), $attrs.class ?? '')">
        <slot />
    </component>
</template>

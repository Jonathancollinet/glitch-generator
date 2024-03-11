<script lang="ts" setup>
import { LinkVariants, type LinkVariantsProps } from '~/componentsVariants/Ui/Link';
import { NuxtLink } from "#components";
import type { HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<{
    as?: "a" | typeof NuxtLink
    variant?: LinkVariantsProps['variant'],
    class?: HTMLAttributes['class']
}>(), {
    as: NuxtLink
});

</script>

<template>
    <component :is="as" :class="cn(LinkVariants({ variant }), props.class ?? '')">
        <slot />
    </component>
</template>

<style>

</style>
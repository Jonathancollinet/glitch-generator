<script lang="ts" setup>
import { LinkVariants, type LinkVariantsProps } from '~/componentsVariants/Ui/Link';
import { NuxtLink } from "#components";

withDefaults(defineProps<{
    as?: "a" | typeof NuxtLink
    variant?: LinkVariantsProps['variant']
}>(), {
    as: NuxtLink
});

</script>

<template>
    <component :is="as" :class="cn(LinkVariants({ variant }), $attrs.class ?? '')">
        <slot />
    </component>
</template>

<style>

</style>
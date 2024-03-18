<script lang="ts" setup>
import { LinkVariants, type LinkVariantsProps } from "~/ui/Link";
import { NuxtLink } from "#components";
import type { HTMLAttributes } from "vue";

const props = withDefaults(
    defineProps<{
        as?: "a" | typeof NuxtLink;
        variant?: LinkVariantsProps["variant"];
        class?: HTMLAttributes["class"];
    }>(),
    {
        as: NuxtLink,
        class: "",
        variant: undefined,
    },
);

const linkBindings = {
    noPrefetch: true,
};
</script>

<template>
    <component :is="as" :class="cn(LinkVariants({ variant }), props.class)" v-bind="linkBindings">
        <slot />
    </component>
</template>

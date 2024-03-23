<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { TextVariants, type TextVariantsProps } from "~/ui/Text";

const props = withDefaults(
    defineProps<{
        as?: "div" | "span" | "p" | "label";
        class?: HTMLAttributes["class"];
        size?: TextVariantsProps["size"];
        color?: TextVariantsProps["color"];
    }>(),
    {
        as: "p",
        class: "",
        size: "default",
        color: "default",
    },
);

const variant = computed(() => {
    return props.as as TextVariantsProps["variant"];
});
</script>

<template>
    <component :is="as" :class="cn('text', TextVariants({ variant, size, color }), props.class)">
        <slot />
    </component>
</template>

<style scoped>
.text {
    font-family: "Signika Negative", sans-serif;
}
</style>

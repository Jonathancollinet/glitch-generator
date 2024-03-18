<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { TextVariants } from "~/ui/Text";

const props = withDefaults(
    defineProps<{
        as?: "div" | "span" | "p" | "label";
        class?: HTMLAttributes["class"];
    }>(),
    {
        as: "p",
        class: "",
    },
);
</script>

<template>
    <component
        :is="as"
        :data-tag="as"
        :class="cn('text', TextVariants(), props.class)"
    >
        <slot />
    </component>
</template>

<style scoped>
.text {
    font-family: "Signika Negative", sans-serif;
}
</style>

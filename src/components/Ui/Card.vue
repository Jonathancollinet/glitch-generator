<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import type { HTMLAttributes } from "vue";
import { CardVariants, type CardVariantsProps } from "~/ui/Card";
import { Icons } from "~/types/enums";

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes["class"];
        variant?: CardVariantsProps["variant"];
        size?: CardVariantsProps["size"];
        openable?: boolean;
        isOpen?: boolean;
        contentClasses?: ClassValue;
        noContentPad?: boolean;
    }>(),
    {
        openable: false,
        isOpen: true,
        noContentPad: false,
        class: "",
        variant: undefined,
        size: undefined,
        contentClasses: "",
    },
);

const openToggle = ref(props.isOpen);

const titleClass = computed(() => [
    "*:m-0 select-none transition-opacity duration-100",
    props.openable ? "cursor-pointer hover:opacity-60" : "",
]);

const contentClass = computed(() => [
    props.noContentPad ? "" : "px-4",
    props.openable && openToggle.value ? "mt-2 ml-2 border-l-2" : "",
]);
</script>

<template>
    <div :class="cn(CardVariants({ variant, size }), props.class)">
        <div v-if="$slots.title" :class="cn(titleClass)">
            <template v-if="!openable">
                <slot name="title" />
            </template>
            <template v-else>
                <div class="flex select-none items-center justify-between *:m-0" @click="openToggle = !openToggle">
                    <slot name="title" />
                    <UiIcon :icon="openToggle ? Icons.ChevronUp : Icons.ChevronDown" />
                </div>
            </template>
        </div>
        <div v-if="openToggle" :class="cn(contentClass, props.contentClasses)">
            <slot name="content" />
        </div>
    </div>
</template>

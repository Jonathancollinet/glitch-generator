<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";

const props = defineProps<{
    title: string;
    description: string;
    url: string;
}>();

function goTo() {
    navigateTo(props.url);
}

const cardClasses: ClassValue[] = [
    "border-2",
    "shadow-[6px_6px_0px_theme(colors.neutral.700)]",
    "dark:shadow-[6px_6px_0px_theme(colors.neutral.50)]",
    "transition-[background-color]",
    "cursor-pointer",
    "p-4",
    "bg-primary-50",
    "hover:bg-primary-200",
    "dark:bg-primary-950",
    "hover:dark:bg-primary-900",
];
</script>

<template>
    <div :class="cn(cardClasses)" @click="goTo">
        <UiHeading variant="h2" class="mt-0 uppercase">
            {{ $t(title) }}
        </UiHeading>
        <UiText>
            {{ $t(description) }}
        </UiText>
    </div>
</template>

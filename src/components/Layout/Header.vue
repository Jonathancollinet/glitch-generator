<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import { Icons } from "~/types/enums";
import { navigationItems } from "~/utils/constants";

const colorMode = useColorMode();
const refColorMode = ref(colorMode);

const darkModeIcon = computed(() => {
    return refColorMode.value.value === "dark" ? Icons.Sun : Icons.Moon;
});

function onClickColorSheme() {
    toggleDarkMode();
}

const headerClass: ClassValue[] = [
    "h-header",
    "transition-[background-color]",
    "bg-primary-50 dark:bg-neutral-800",
    "flex items-center justify-between",
    "px-8 border-b-2 border-neutral-700",
    "dark:border-neutral-50",
];
</script>

<template>
    <header :class="cn(headerClass)">
        <div class="flex items-center">
            <LayoutLogo class="cursor-pointer" @click="$router.push('/')" />
            <nav class="ml-6 sm:ml-12">
                <ul class="flex justify-center space-x-4 sm:space-x-6">
                    <LayoutNavigationList :items="navigationItems" />
                </ul>
            </nav>
        </div>
        <div class="flex justify-center space-x-4">
            <ClientOnly>
                <UiButton variant="icon" size="icon" @click="onClickColorSheme">
                    <UiIcon :icon="darkModeIcon" />
                </UiButton>
            </ClientOnly>
            <UiButton as="div" variant="icon" size="icon">
                <UiLink
                    variant="icon"
                    as="a"
                    href="https://github.com/Jonathancollinet/glitch-generator"
                    target="_blank"
                >
                    <UiIcon variant="filled" :icon="Icons.Github" />
                </UiLink>
            </UiButton>
        </div>
    </header>
</template>

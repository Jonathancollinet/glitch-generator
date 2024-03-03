<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { Icons } from '~/types/enums';

const { tm, locale } = useI18n();

const colorMode = useColorMode()
const navigationItems = useNavigationItems();

const darkModeIcon = ref(Icons.Moon);

function setDarkModeIcon() {
    darkModeIcon.value = colorMode.preference === "dark" ? Icons.Sun : Icons.Moon;
}

function onClickColorSheme() {
    toggleDarkMode();
    setDarkModeIcon();
}

const headerClass: ClassValue[] = [
    "h-header",
    "flex items-center justify-between",
    "px-8 border-b-2 border-neutral-400",
    "dark:border-primary-50"
];

onMounted(() => {
    setDarkModeIcon();
});
</script>

<template>
    <header :class="cn(headerClass)">
        <nav>
            <ul class="flex justify-center space-x-6">
                <LayoutNavigationList :items="navigationItems" />
            </ul>
        </nav>
        <div class="flex justify-center space-x-4">
            <UiButton variant="icon" size="icon" @click="onClickColorSheme">
                <UiIcon :icon="darkModeIcon" />
            </UiButton>
            <UiLink variant="icon" as="a" href="https://github.com/Jonathancollinet/glitch-generator" target="_blank">
                <UiButton as="div" variant="icon" size="icon">
                    <UiIcon variant="filled" :icon="Icons.Github" />
                </UiButton>
            </UiLink>
            <!-- <UiButton variant="icon" size="icon" @click="locale = locale === 'fr' ? 'en' : 'fr'">
                <UiIcon :icon="Icons.Language" />
            </UiButton> -->
        </div>
    </header>
</template>

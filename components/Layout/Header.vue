<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { EIcons } from '~/types/icons';

const { t } = useI18n();
const colorMode = useColorMode()
const navigationItems = useNavigationItems(t);

const darkModeIcon = ref(EIcons.Moon);

function setDarkModeIcon() {
    darkModeIcon.value = colorMode.preference === "dark" ? EIcons.Sun : EIcons.Moon;
}

function onClickColorSheme() {
    toggleDarkMode();
    setDarkModeIcon();
}

const headerClass: ClassValue[] = [
    "h-header",
    "flex items-center justify-between transition-colors",
    "px-8 border-b border-neutral-200",
    "dark:border-blue-50"
];

onMounted(() => {
    setDarkModeIcon();
});
</script>

<template>
    <header :class="cn(headerClass, $attrs.class ?? '')">
        <nav>
            <ul class="flex justify-center space-x-2">
                <LayoutNavigationList :items="navigationItems" />
            </ul>
        </nav>
        <div class="flex justify-center space-x-2">
            <UiButton variant="icon" size="icon" @click="onClickColorSheme">
                <UiIcon :icon="darkModeIcon" />
            </UiButton>
            <UiLink variant="icon" as="a" href="https://github.com/Jonathancollinet/glitch-generator" target="_blank">
                <UiIcon variant="filled" :icon="EIcons.Github" />
            </UiLink>
            <UiButton variant="icon" size="icon">
                <UiIcon :icon="EIcons.Language" />
            </UiButton>
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { navigationItems } from '~/constants/navigation';
import { EIcons } from '~/types/icons';

const headerClass: ClassValue[] = [
    "flex items-center justify-between transition-colors",
    "px-8 py-4 border-b border-neutral-200",
    "dark:bg-blue-900 dark:border-blue-50"
];
</script>

<template>
    <header :class="cn(headerClass, $attrs.class ?? '')">
        <nav>
            <ul class="flex [&_a]:pe-2">
                <LayoutNavigationList :items="navigationItems" />
            </ul>
        </nav>
        <UiButton variant="icon" size="icon" @click="toggleDarkMode">
            <UiIcon :icon="EIcons.Moon" />
        </UiButton>
    </header>
</template>

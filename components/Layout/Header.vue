<script lang="ts" setup>
import { navigationItems } from '~/constants/navigation';
import { EIcons } from '~/types/icons';
import { EExternalUrls } from '~/types/navigation';
</script>

<template>
    <header class="flex justify-between px-8 py-4 bg-blue-50 border-b-[1px] border-blue-400">
        <nav>
            <ul class="flex">
                <LayoutNavigationList :items="navigationItems" as="li" />
            </ul>
        </nav>
        <UiLink as="a">
            <UiIcon :icon="EIcons.Moon" />
        </UiLink>
    </header>
</template>

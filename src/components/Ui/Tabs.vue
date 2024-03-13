<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';

const props = defineProps<{
    tabs: Tabs,
}>();

const openTab = defineModel<keyof typeof props.tabs>({ required: false });

const activeTab = ref<keyof typeof props.tabs>(openTab.value || Object.keys(props.tabs)[0]);
const isActive = (key: keyof typeof props.tabs) => activeTab.value === key;

function activateTab(key: keyof typeof props.tabs) {
    activeTab.value = key;

    if (openTab) {
        openTab.value = key;
    }
}

const actionClasses: (key: string | number) => ClassValue[] = (key: string | number) => [
    'w-full border-b rounded-none',
    'border-r-0 last:border-r',
    'hover:bg-primary-100',
    isActive(key) && [
        'bg-primary-400 hover:bg-primary-400 *:text-primary-50 dark:bg-primary-900 dark:hover:bg-primary-900',
    ]
];
</script>

<template>
    <div>
        <div class="flex">
            <UiButton v-for="(tab, key) in tabs" :key="key" variant="outline" :class="cn(actionClasses(key))"
                @click="activateTab(key)">
                {{ $t(tab.label) }}
            </UiButton>
        </div>
        <slot :activeTab="activeTab" />
    </div>
</template>
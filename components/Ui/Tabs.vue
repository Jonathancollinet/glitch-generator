<script lang="ts" setup>
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

</script>

<template>
    <div>
        <div class="flex">
            <UiButton v-for="(tab, key) in   tabs  " :key="key" variant="ghost" :class="cn([
                'w-full border-b rounded-none',
                'first:border-l-0',
                'last:border-r-0',
                isActive(key) && [
                    'bg-primary-200 hover:bg-primary-200 border border-b-transparent *:text-primary-500',
                ]
            ])" @click="activateTab(key)">
                <UiIcon v-if="tab.icon" :icon="tab.icon" />
                <UiText as="span">{{ $t(tab.label) }} </UiText>
            </UiButton>
        </div>
        <div class="p-4">
            <slot :activeTab="activeTab" />
        </div>
    </div>
</template>
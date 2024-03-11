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
            <UiButton v-for="(tab, key) in tabs" :key="key" variant="outline" :class="cn([
                'w-full border-b rounded-none',
                'first:border-r-0',
                'hover:bg-primary-100',
                isActive(key) && [
                    'bg-primary-400 hover:bg-primary-400 *:text-primary-50',
                ]
            ])" @click="activateTab(key)">
                <UiIcon v-if="tab.icon" :icon="tab.icon" />
                <UiText as="span">{{ $t(tab.label) }} </UiText>
            </UiButton>
        </div>
        <slot :activeTab="activeTab" />
    </div>
</template>
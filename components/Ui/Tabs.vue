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
            <div class="flex-1" v-for="(tab, key) in tabs" :key="key">
                <UiButton :class="{ 'bg-gray-200': isActive(key) }" @click="activateTab(key)">
                    <UiIcon v-if="tab.icon" :icon="tab.icon" />
                    <UiText as="span">{{ $t(tab.label) }}</UiText>
                </UiButton>
            </div>
        </div>
        <slot :activeTab="activeTab" />
    </div>
</template>
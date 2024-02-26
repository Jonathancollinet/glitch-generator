<script lang="ts" setup>
const props = defineProps<{
    tabs: Tabs
}>();

const activeTab = ref<keyof typeof props.tabs>('');
const isActive = (key: keyof typeof props.tabs) => activeTab.value === key;

function activateTab(key: keyof typeof props.tabs) {
    activeTab.value = key;
}
</script>

<template>
  <div>
    <div class="flex">
      <div v-for="(tab, key) in tabs" :key="key" class="flex-1">
        <UiButton :class="{ 'bg-gray-200': isActive(key) }" @click="activateTab(key)">
            <UiIcon v-if="tab.icon" :icon="tab.icon" />
            <UiText as="span">{{ $t(tab.label) }}</UiText>
        </UiButton>
      </div>
    </div>
    <slot :activeTab="activeTab" />
  </div>
</template>
<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import type { HTMLAttributes } from 'vue';
import { Icons } from '~/types/enums';

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class'],
    openable?: boolean,
    isOpen?: boolean,
    noContentPad?: boolean,
}>(), {
    openable: false,
    isOpen: true,
});

const openToggle = ref(props.isOpen);

const cardClasses: ClassValue[] = [
    'mb-4 last:mb-0 transition-[background-color]',
]

const titleClass = computed(() => cn([
    '*:m-0 mb-2 select-none transition-opacity duration-100',
    props.openable ? 'cursor-pointer hover:opacity-60' : '',
]));

const contentClass = computed(() => cn([
    props.noContentPad ? '' : 'px-4',
    props.openable && openToggle.value ? 'ml-4 border-l' : ''
]));
</script>

<template>
  <div :class="cn(cardClasses, props.class)">
    <div v-if="$slots.title" :class="titleClass">
        <template v-if="!openable">
            <slot name="title" />
        </template>
        <template v-else>
            <div class="*:m-0 flex items-center justify-between select-none" @click="openToggle = !openToggle">
                <slot name="title" />
                <UiIcon :icon="openToggle ? Icons.ChevronUp : Icons.ChevronDown" />
            </div>
        </template>
    </div>
    <div :class="cn(contentClass)" v-if="openToggle">
            <slot name="content" />
        </div>
  </div>
</template>
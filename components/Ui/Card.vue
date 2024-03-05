<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import type { HTMLAttributes } from 'vue';
import { Icons } from '~/types/enums';

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class'],
    openable?: boolean,
    isOpen?: boolean,
}>(), {
    openable: false,
    isOpen: true,
});

const openToggle = ref(props.isOpen);

const cardClasses: ClassValue[] = [
    'border border-primary-900 rounded-tl-2xl rounded-br-2xl mb-4 last:mb-0 transition-[background-color]',
    'bg-primary-100',
    'dark:bg-neutral-700',
]

const titleClass = computed(() => cn([
    '*:m-0 px-4 py-2 rounded-tl-2xl',
    'bg-primary-500 text-neutral-50',
    props.openable ? 'transition-colors cursor-pointer hover:bg-primary-600' : '',
    !openToggle.value ? 'rounded-br-2xl' : '',
]));
</script>

<template>
  <div :class="cn(cardClasses, props.class)">
    <div v-if="$slots.title" :class="cn(titleClass)">
        <template v-if="!openable">
            <slot name="title" />
        </template>
        <template v-else>
            <div class="*:m-0 flex items-center justify-between select-none" @click="openToggle = !openToggle">
                <slot name="title" />
                <UiIcon class="stroke-neutral-50" :icon="openToggle ? Icons.ChevronUp : Icons.ChevronDown" />
            </div>
        </template>
    </div>
    <div class="p-4 rounded-br-2xl" v-if="openToggle">
            <slot name="content" />
        </div>
  </div>
</template>
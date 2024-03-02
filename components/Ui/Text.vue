<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import type { HTMLAttributes } from 'vue';
import { TextVariants, type TextVariantsProps } from '~/componentsVariants/Ui/Text';

const props = withDefaults(defineProps<{
	as?: 'div' | 'span' | 'p',
    class?: HTMLAttributes['class'],
}>(), {
    as: 'p',
});
</script>

<template>
    <component
        :data-tag="as"
        :is="as"
        :class="cn(TextVariants(), props.class ?? '')">
        <slot />
    </component>
</template>

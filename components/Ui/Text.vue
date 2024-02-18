<script lang="ts" setup>
import type { ClassValue } from 'class-variance-authority/types';
import { TextVariants, type TextVariantsProps } from '~/componentsVariants/Ui/Text';

withDefaults(defineProps<{
	as?: 'div' | 'span' | 'p'
    dataTag: 'p' | 'span'
}>(), {
    as: 'p',
    dataTag: 'p'
});
</script>

<template>
    <component
        :data-tag="dataTag"
        :is="as"
        :class="cn(TextVariants(), $attrs.class ?? '')">
        <slot />
    </component>
</template>

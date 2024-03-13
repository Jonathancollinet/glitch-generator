<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ButtonVariants, type ButtonVariantsProps } from '~/componentsVariants/Ui/Button';

const props = withDefaults(defineProps<{
	variant?: ButtonVariantsProps['variant'],
	size?: ButtonVariantsProps['size'],
	color?: ButtonVariantsProps['color'],
	as?: 'button' | 'div',
    class?: HTMLAttributes['class'],
}>(), {
	as: 'button'
});
</script>

<template>
	<component
		:is="as"
		:class="cn(ButtonVariants({ variant, size, color }), props.class ?? '')">
    <slot />
	</component>
</template>
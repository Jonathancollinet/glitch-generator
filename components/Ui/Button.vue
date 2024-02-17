<script setup lang="ts">
import { ButtonVariants, type ButtonVariantsProps } from '~/componentsVariants/Ui/Button';

withDefaults(defineProps<{
	variant?: ButtonVariantsProps['variant']
	size?: ButtonVariantsProps['size']
	as?: 'button' | 'div'
}>(), {
	as: 'button'
});
</script>

<template>
	<component
		:is="as"
		:class="cn(ButtonVariants({ variant, size }), $attrs.class ?? '')">
		<slot />
	</component>
</template>
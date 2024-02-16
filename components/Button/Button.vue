<script setup lang="ts">
import { ButtonVariants, type ButtonVariantsProps } from '.';

const props = withDefaults(defineProps<{
	class?: string,
	variant?: ButtonVariantsProps['variant']
	size?: ButtonVariantsProps['size']
	as?: string
}>(), {
	as: 'button'
});

const button = computed(() => cn(ButtonVariants({
	variant: props.variant,
	size: props.size
}), props.class ?? ''));

</script>

<template>
	<component
		:is="as"
		:class="button"
	>
		<slot />
	</component>
</template>
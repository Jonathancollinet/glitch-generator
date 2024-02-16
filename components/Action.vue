<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';

const ActionVariants = Variants.ActionVariants;

export interface ActionProps extends VariantProps<typeof ActionVariants> {};

export interface Props {
	class?: string,
	variant?: ActionProps['variant']
	size?: ActionProps['size']
	as?: string
}

const props = withDefaults(defineProps<Props>(), {
	as: 'button'
})

const button = computed(() => cn(ActionVariants({ variant: props.variant, size: props.size }), props.class ?? ''));
</script>

<template>
	<component
		:is="as"
		:class="button"
	>
		<slot />
	</component>
</template>

<style scoped>

</style>
<script lang="ts" setup>
import { MoonIcon } from '@heroicons/vue/24/solid';
import { IconVariants, type IconVariantsProps } from '~/componentsVariants/Ui/Icon';
import { EIcons } from '~/types/icons';

defineProps<{
	variant?: IconVariantsProps['variant']
    icon: EIcons
}>();
</script>

<template>
    <component :is="icon" :class="cn(IconVariants({ variant }), $attrs.class ?? '')" />
</template>
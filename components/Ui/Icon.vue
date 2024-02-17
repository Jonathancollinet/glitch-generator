<script lang="ts" setup>
import { MoonIcon } from '@heroicons/vue/24/solid';
import { IconVariants, type IconVariantsProps } from '~/componentsVariants/Ui/Icon';
import { EIcons } from '~/types/icons';

const props = defineProps<{
	variant?: IconVariantsProps['variant']
    icon: EIcons
}>();

const IconMap = {
    [EIcons.Moon]: MoonIcon
};

const icon = IconMap[props.icon];
</script>

<template>
    <component :is="icon" :class="cn(IconVariants({ variant }), $attrs.class ?? '')" />
</template>
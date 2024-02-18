<script lang="ts" setup>
import { MoonIcon, LanguageIcon, SunIcon } from '@heroicons/vue/24/outline';
import GithubIcon from './Icons/Github.vue';

import { IconVariants, type IconVariantsProps } from '~/componentsVariants/Ui/Icon';
import { EIcons } from '~/types/icons';

const props = defineProps<{
	variant?: IconVariantsProps['variant']
    icon: EIcons
}>();

const IconMap = {
    [EIcons.Moon]: MoonIcon,
    [EIcons.Language]: LanguageIcon,
    [EIcons.Github]: GithubIcon,
    [EIcons.Sun]: SunIcon,
};

const icon = computed(() => IconMap[props.icon]);
</script>

<template>
    <component :is="icon" :class="cn(IconVariants({ variant }), $attrs.class ?? '')" />
</template>
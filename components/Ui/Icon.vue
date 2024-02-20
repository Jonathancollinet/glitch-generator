<script lang="ts" setup>
import { MoonIcon, LanguageIcon, SunIcon } from '@heroicons/vue/24/outline';
import GithubIcon from './Icons/Github.vue';
import { Icons } from '~/types/enums';

import { IconVariants, type IconVariantsProps } from '~/componentsVariants/Ui/Icon';

const props = defineProps<{
	variant?: IconVariantsProps['variant']
    icon: IconsValues
}>();

const IconMap = {
    [Icons.Moon]: MoonIcon,
    [Icons.Language]: LanguageIcon,
    [Icons.Github]: GithubIcon,
    [Icons.Sun]: SunIcon,
};

const icon = computed(() => IconMap[props.icon]);
</script>

<template>
    <component :is="icon" :class="cn(IconVariants({ variant }), $attrs.class ?? '')" />
</template>
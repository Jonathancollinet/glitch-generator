<script lang="ts" setup>
import {
    MoonIcon,
    LanguageIcon,
    SunIcon,
    PlayIcon,
    PauseIcon,
    EllipsisHorizontalIcon,
    ForwardIcon,
    BackwardIcon,
} from '@heroicons/vue/24/outline';
import GithubIcon from './Icons/Github.vue';
import { Icons } from '~/types/enums';

import { IconVariants, type IconVariantsProps } from '~/componentsVariants/Ui/Icon';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
	variant?: IconVariantsProps['variant']
    icon: IconsUnion,
    class?: HTMLAttributes['class'],
}>();

const IconMap = {
    [Icons.Moon]: MoonIcon,
    [Icons.Language]: LanguageIcon,
    [Icons.Github]: GithubIcon,
    [Icons.Sun]: SunIcon,
    [Icons.Play]: PlayIcon,
    [Icons.Pause]: PauseIcon,
    [Icons.Dots]: EllipsisHorizontalIcon,
    [Icons.Forward]: ForwardIcon,
    [Icons.Backward]: BackwardIcon,
};

const icon = computed(() => IconMap[props.icon]);
</script>

<template>
    <component :is="icon" :class="cn(IconVariants({ variant }), props.class ?? '')" />
</template>
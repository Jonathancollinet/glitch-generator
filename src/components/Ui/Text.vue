<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { TextVariants } from '~/componentsVariants/Ui/Text';

const props = withDefaults(defineProps<{
	as?: 'div' | 'span' | 'p',
    class?: HTMLAttributes['class'],
}>(), {
    as: 'p',
});
</script>

<template>
    <component
        :data-tag="as"
        :is="as"
        :class="cn('text', TextVariants(), props.class ?? '')">
        <slot />
    </component>
</template>

<style scoped>
.text {
    font-family: "Signika Negative", sans-serif;
}
</style>
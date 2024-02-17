<script lang="ts" setup>
import type { INavigationItem } from '~/types/navigation';

withDefaults(defineProps<{
    items: Array<INavigationItem>
    as?: "li" | "div"
}>(), {
    as: 'li'
});
</script>

<template>
    <component
        :is="as"
        v-for="(item, index) in items"
        :key="'link-' + index">
        <LayoutNavigationLink :to="item.to">
            {{ item.label }}
        </LayoutNavigationLink>
    </component>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    items: NavigationItem[]
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
            {{ $t(item.label) }}
        </LayoutNavigationLink>
    </component>
</template>
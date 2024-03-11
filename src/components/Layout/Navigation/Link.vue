<script lang="ts" setup>
defineProps<{
    to: UrlsUnion
}>();
</script>
    
<template>
    <UiLink :to="to">
        <slot />
    </UiLink>
</template>

<style>

</style>
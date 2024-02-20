<script lang="ts" setup>
defineProps<{
    to: UrlsValues
}>();
</script>
    
<template>
    <UiLink :to="to">
        <slot />
    </UiLink>
</template>

<style>

</style>
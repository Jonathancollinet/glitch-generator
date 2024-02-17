<script lang="ts" setup>
import type { EUrls } from '~/types/navigation';

defineProps<{
    to: EUrls
}>();
</script>
    
<template>
    <UiLink :to="to">
        <slot />
    </UiLink>
</template>

<style>

</style>
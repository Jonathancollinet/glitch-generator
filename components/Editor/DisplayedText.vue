<script setup lang="ts">
</script>

<template>
    <div class="relative w-full h-[100vw] bg-blue-100 min-h-72 max-h-[80vh]">
        <div class="flex h-full items-center justify-center select-none">
            <slot />
        </div>
        <div class="absolute w-full bottom-1 flex justify-center items-center">
            <slot name="controls" />
        </div>
    </div>
</template>

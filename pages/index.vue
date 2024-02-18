<script lang="ts" setup>
</script>

<template>
    <div class="h-full flex flex-col items-center">
        <UiHeading class="w-2 relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.title') }}
        </UiHeading>
        <UiText data-tag="p" class="text-center">
            {{ $t('pages.home.description') }}
        </UiText>
    </div>
</template>
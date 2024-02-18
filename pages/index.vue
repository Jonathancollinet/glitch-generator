<script lang="ts" setup>
import { EUrls } from '~/types/navigation';

const editorRoute = useNavigationItem(EUrls.Editor)?.to;
</script>

<template>
    <div class="h-full flex flex-col items-center">
        <UiHeading class="w-2 relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.description') }}
        </UiText>
        <UiHeading variant="h2" class="relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.why.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.why.description') }}
        </UiText>
        <UiText as="div" class="text-center m-12 font-bold tracking-widest">
            {{ $t('pages.home.why.result') }}
        </UiText>
        <UiHeading variant="h2" class="relative text-center flex justify-center uppercase break-words">
            {{ $t('pages.home.share.title') }}
        </UiHeading>
        <UiText as="p" class="text-center">
            {{ $t('pages.home.share.description') }}
        </UiText>
        <UiLink v-if="editorRoute" :to="editorRoute">
            <UiButton class="mt-2">
                {{ $t('pages.home.share.button') }}
            </UiButton>
        </UiLink>
    </div>
</template>
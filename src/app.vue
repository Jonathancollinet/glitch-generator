<script lang="ts" setup>
import { ModalsContainer } from "vue-final-modal";

useHead({
    htmlAttrs: {
        lang: useI18n().locale.value,
    },
    link: [
        {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "/apple-touch-icon.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
        },
        {
            rel: "manifest",
            href: "/site.webmanifest",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#5bbad5",
        },
    ],
    meta: [
        {
            name: "msapplication-TileColor",
            content: "#da532c",
        },
    ],
});
</script>

<template>
    <LayoutHeader />
    <main>
        <div>
            <div class="min-h-[calc(100%-48px)]">
                <NuxtPage />
            </div>
            <LayoutFooter />
        </div>
    </main>
    <ModalsContainer />
</template>

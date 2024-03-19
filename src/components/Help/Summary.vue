<script lang="ts" setup>
import { Urls } from "~/types/enums";

defineProps<{
    chapters: Chapter[];
}>();
</script>

<template>
    <div class="flex flex-col items-start border-l-2 pl-4 sm:flex-row sm:space-x-4">
        <UiLink v-for="(chapter, index) in chapters" :key="index" class="text-sm" :to="`${Urls.Help}/${chapter.name}`">
            {{ $t("pages.help.summary." + chapter.name) }}
        </UiLink>
    </div>
</template>

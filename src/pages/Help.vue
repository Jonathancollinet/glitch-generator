<script lang="ts" setup>
import { HelpChapter, Icons, Urls } from "~/types/enums";
import { chapters } from "~/utils/constants";

useServerSeoMeta(useTranslatedSeoMeta("help"));

definePageMeta({
    redirect: "/help/tool",
});

const route = useRoute();
const activeChapter = computed(() => {
    const chapterName = route.fullPath.split("/").pop() as HelpChapter;

    return chapters.find((chapter) => chapter.name === chapterName) || chapters[0];
});

function changeChapter(chapterName: HelpChapter) {
    const chapter = chapters.find((chapter) => chapter.name === chapterName);

    if (chapter) {
        navigateTo(`${Urls.Help}/${chapter.name}`);
    }
}

function previous() {
    if (previousChapter.value) {
        changeChapter(previousChapter.value.name);
    }
}

function next() {
    if (nextChapter.value) {
        changeChapter(nextChapter.value.name);
    }
}

const previousChapter = computed(() => {
    const index = chapters.findIndex((chapter) => chapter.name === activeChapter.value.name);
    return index > 0 ? chapters[index - 1] : null;
});

const nextChapter = computed(() => {
    const index = chapters.findIndex((chapter) => chapter.name === activeChapter.value.name);
    return index < chapters.length - 1 ? chapters[index + 1] : null;
});
</script>

<template>
    <div class="mx-auto max-w-[800px]">
        <UiHeading class="mt-0 -translate-x-[11px]">{{ $t("pages.help.title") }}</UiHeading>
        <div class="sticky top-0 z-30 mb-8 bg-primary-100 pt-8 transition-[background-color] dark:bg-neutral-900">
            <HelpSummary class="border-b-2 pb-4" :chapters="chapters" />
        </div>
        <div class="mb-12 space-y-8">
            <NuxtPage />
        </div>
        <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 md:w-full">
            <UiButton v-if="previousChapter" variant="outline" @click="previous">
                <UiIcon :icon="Icons.ArrowLeft" />
                <div>
                    {{ $t("pages.help.summary." + previousChapter.name) }}
                </div>
            </UiButton>
            <div v-else />
            <UiButton v-if="nextChapter" variant="outline" @click="next">
                <div>
                    {{ $t("pages.help.summary." + nextChapter.name) }}
                </div>
                <UiIcon :icon="Icons.ArrowRight" />
            </UiButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { HelpChapter, Icons, Urls } from '~/types/enums';

useSeoMeta({
    title: 'Glitch Generator - Help',
    ogTitle: 'Glitch Generator - Help',
    description: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogDescription: 'Glitch editor based on the text-shadow & box-shadow CSS properties. Create and export your animation as code.',
    ogImage: ''
});

definePageMeta({
    redirect: "/help/tool",
});

const chapters: Chapter[] = [
    {
        name: HelpChapter.Tool
    },
    {
        name: HelpChapter.Input
    },
    {
        name: HelpChapter.Keyframes
    },
    {
        name: HelpChapter.Export
    },
    {
        name: HelpChapter.Import
    },
    {
        name: HelpChapter.Presets
    },
];

const router = useRouter();
const activeChapter = shallowRef<Chapter>(getActiveChapter());

function getActiveChapter() {
    const chapter = chapters.find((chapter) => router.currentRoute.value.fullPath.includes(chapter.name));
    return chapter || chapters[0];
}

function changeChapter(chapterName: HelpChapter) {
    const chapter = chapters.find((chapter) => chapter.name === chapterName);

    if (chapter) {
        activeChapter.value = chapter;
        router.push(`${Urls.Help}/${activeChapter.value.name}`);
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
    <div class="max-w-[800px] mx-auto">
        <UiHeading class="-translate-x-[11px]">{{ $t('pages.help.title') }}</UiHeading>
        <div class=" sticky top-0 z-30 bg-primary-100 dark:bg-neutral-900 pt-8 mb-8">
            <HelpSummary class="border-b-2 pb-4" :activeChapter="activeChapter" :chapters="chapters"
                @activeChapter="changeChapter" />
        </div>
        <div class="space-y-8 mb-12" :id="activeChapter.name">
            <NuxtPage></NuxtPage>
        </div>
        <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row md:w-full sm:justify-between sm:items-center">
            <UiButton v-if="previousChapter" variant="outline" @click="previous">
                <UiIcon :icon="Icons.ArrowLeft" />
                <div>{{ $t('pages.help.summary.' + previousChapter.name) }}</div>
            </UiButton>
            <div v-else />
            <UiButton v-if="nextChapter" variant="outline" @click="next">
                <div>
                    {{ $t('pages.help.summary.' + nextChapter.name) }}
                </div>
                <UiIcon :icon="Icons.ArrowRight" />
            </UiButton>
        </div>
    </div>
</template>
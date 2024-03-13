<script lang="ts" setup>
import { HelpChapter, Icons } from '~/types/enums';

useSeoMeta({
    title: 'Glitch Generator - Help',
    ogTitle: 'Glitch Generator - Help',
    description: 'Helps you to create complex text/box shadow animations. At any moment, you can retrieve your animation as a CSS keyframes to use it in your web project.',
    ogDescription: 'Helps you to create complex text/box shadow animations. At any moment, you can retrieve your animation as a CSS keyframes to use it in your web project.',
    ogImage: ''
});

const chapters: Chapter[] = [
    {
        name: HelpChapter.Tool,
        component: resolveComponent('HelpTool') as Component,
    },
    {
        name: HelpChapter.Input,
        component: resolveComponent('HelpInput') as Component,
    },
    {
        name: HelpChapter.Keyframes,
        component: resolveComponent('HelpKeyframes') as Component,
    },
    {
        name: HelpChapter.Export,
        component: resolveComponent('HelpExport') as Component,
    },
    {
        name: HelpChapter.Import,
        component: resolveComponent('HelpImport') as Component,
    },
    {
        name: HelpChapter.Presets,
        component: resolveComponent('HelpPresets') as Component,
    },
];

const router = useRouter();
const activeChapter = shallowRef<Chapter>(chapters[0]);

function changeChapter(chapterName: HelpChapter) {
    const chapter = chapters.find((chapter) => chapter.name === chapterName);

    if (chapter) {
        activeChapter.value = chapter;
        router.push(`#${activeChapter.value.name}`);
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

onMounted(() => {
    const hash = window.location.hash;

    if (hash) {
        changeChapter(hash.slice(1) as HelpChapter);
    }
});
</script>

<template>
    <div class="max-w-[800px] mx-auto">
        <UiHeading class="-translate-x-[11px]">{{ $t('pages.help.title') }}</UiHeading>
        <div class=" sticky top-0 z-30 bg-primary-100 dark:bg-neutral-900 pt-8 mb-8">
            <HelpSummary class="border-b-2 pb-4" :activeChapter="activeChapter" :chapters="chapters" @activeChapter="changeChapter" />
        </div>

        <div class="space-y-8 mb-12" :id="activeChapter.name">
            <component :key="activeChapter.name" :is="activeChapter.component" />
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
<script lang="ts" setup>
import type { HelpChapter } from '~/types/enums';

const props = defineProps<{
    activeChapter: Chapter,
    chapters: Chapter[]
}>();

const emit = defineEmits<{
    activeChapter: [part: HelpChapter]
}>();

function active(part: HelpChapter) {
    emit('activeChapter', part);
}

function isActive(part: HelpChapter) {
    return props.activeChapter.name === part;
}

function linkClass(part: HelpChapter) {
    return {
        'text-primary-500 font-bold': isActive(part)
    };
}
</script>

<template>
    <div class="flex flex-col sm:flex-row sm:space-x-4 items-start border-l-2 pl-4">
        <UiButton v-for="(chapter, index) in chapters" :key="index" :class="linkClass(chapter.name)" variant="link"
            size="link" @click="active(chapter.name)">{{ $t('pages.help.summary.' + chapter.name) }}</UiButton>
    </div>
</template>
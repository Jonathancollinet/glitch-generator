<script lang="ts" setup>
import { Icons } from "~/types/enums";

const { shortcutsModal } = useModalShortcuts();
</script>

<template>
    <UiButton
        v-tooltip="$t('pages.editor.rangeShortcuts')"
        variant="icon"
        size="icon"
        @click="shortcutsModal.open"
    >
        <UiIcon :icon="Icons.Cursor" />
    </UiButton>
</template>

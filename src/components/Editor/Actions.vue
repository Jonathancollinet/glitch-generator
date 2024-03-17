<script lang="ts" setup>
import type Glitch from "~/glitch";
import G from "~/glitch/types";
import { Icons } from "~/types/enums";

const props = defineProps<{
    glitch: Glitch;
    config: G.Config;
}>();

const { exportModal } = useModalExport(props.glitch);
</script>

<template>
    <div class="flex">
        <UiButton
            v-tooltip="$t('pages.editor.export')"
            variant="icon"
            size="icon"
            @click="exportModal.open"
        >
            <UiIcon :icon="Icons.ExportCode" />
        </UiButton>
    </div>
</template>

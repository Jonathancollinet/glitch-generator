<script lang="ts" setup>
import type Glitch from '~/glitch';
import type { GlitchConfig } from '~/glitch/types';
import { Icons } from '~/types/enums';

const props = defineProps<{
    glitch: Glitch;
    config: GlitchConfig;
}>();

const { exportModal } = useModalExport(props.glitch);
</script>

<template>
    <div class="flex">
        <UiButton v-tooltip="$t('pages.editor.export')" variant="icon" size="icon"
            @click="exportModal.open">
            <UiIcon :icon="Icons.ExportCode" />
        </UiButton>
    </div>
</template>
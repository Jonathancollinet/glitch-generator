<script lang="ts" setup>
import type { GlitchAnimation, GlitchErrors } from '~/glitch/types';
import type { Preset } from '~/utils/Toobox/presets';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'

const props = defineProps<{
    presets: Preset[],
}>()

const currentPreset = defineModel<Preset>({ required: true });

</script>

<template>
    <UiCard openable :isOpen="false">
        <template #title>
            <UiHeading variant="h3">{{ $t('pages.editor.presets.title') }}</UiHeading>
        </template>

        <template #content>
        </template>
    </UiCard>
</template>

<script lang="ts" setup>
import type { GlitchConfig } from '~/glitch/types';
import { Icons } from '~/types/enums';
import { getPresets, updatePreset, type Preset, removePreset, addPreset, type PresetConfig } from '~/utils/Toobox/presets';
import * as EditorUtils from '~/utils/Editor/utils';

const props = defineProps<{
    config: GlitchConfig,
}>()

const currentPreset = defineModel<Preset>({ required: true });

const { addPresetModal } = useModalAddPreset(createPreset);
const { deletePresetModal } = useModalDeletePreset(deletePreset);

const presets = ref<Preset[]>(getPresets());
const { importModal } = useModalImport(createPreset);

function getPresetConfig() {
    return deepCopy({
        text: props.config.text,
        animation: props.config.animation,
        ranges: props.config.ranges
    });
}

function presetChanged(preset: Preset) {
    presets.value = getPresets();
    currentPreset.value = preset;
    EditorUtils.setConfigFromPreset(props.config, currentPreset.value);
}

function createPreset(name: string, config?: PresetConfig) {
    presetChanged(addPreset(name, config || getPresetConfig()));
}

function savePreset() {
    if (!currentPreset.value.builtIn) {
        currentPreset.value.config = getPresetConfig();
        updatePreset(currentPreset.value);
        presets.value = getPresets();
    }
}

function deletePreset() {
    removePreset(currentPreset.value.id);
    presetChanged(presets.value[0]);
}

const isCustomPreset = computed(() => {
    return !currentPreset.value.builtIn;
});

defineExpose({
    savePreset,
})

</script>

<template>
    <div class="flex space-x-2">
        <UiFormGroup class="mb-0" v-tooltip="$t('pages.editor.selectPreset')">
            <UiSelect class="max-w-[120px]" data-v-step="22" :options="presets" v-model="currentPreset"
                labelKey="name" />
        </UiFormGroup>
        <div class="flex items-center" :key="currentPreset.id">
            <UiButton v-tooltip="$t('pages.editor.removePreset')" v-if="isCustomPreset" variant="icon" size="icon"
                @click="deletePresetModal.open">
                <UiIcon class="stroke-red-600 dark:stroke-red-400" :icon="Icons.Trash" />
            </UiButton>
            <UiButton v-tooltip="$t('pages.editor.savePreset')" data-v-step="21" variant="icon" size="icon"
                @click="addPresetModal.open">
                <UiIcon :icon="Icons.Add" />
            </UiButton>
            <UiButton v-tooltip="$t('pages.editor.import')" data-v-step="23" variant="icon" size="icon"
                @click="importModal.open">
                <UiIcon :icon="Icons.ImportCode" />
            </UiButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { Icons } from "~/types/enums";
import {
    getPresets,
    type Preset,
    removePreset,
    addPreset,
    type PresetConfig,
    getLastSelectedPreset,
    saveLastSelectedPreset,
    getPresetConfig,
} from "~/lib/toolbox/presets";
import * as EditorUtils from "~/lib/editor/utils";
import type Glitch from "~/lib/glitch";

const props = defineProps<{
    glitch: Glitch;
    config: G.Config;
}>();

const emit = defineEmits<{
    presetChange: [preset: Preset];
}>();

const presets = ref<Preset[]>(getPresets());
const currentPresetId = ref<string>(getLastSelectedPreset()?.id);

const { addPresetModal } = useModalAddPreset(createPreset);
const { deletePresetModal } = useModalDeletePreset(deletePreset);
const { importModal } = useModalImport(props.glitch, createPreset);

const isCustomPreset = computed(() => {
    return !currentPreset.value.builtIn;
});
const currentPreset = computed(() => {
    return presets.value.find((preset) => preset.id === currentPresetId.value) || presets.value[0];
});
const presetOptions = computed(() => {
    return presets.value.map((preset) => ({
        value: preset.id,
        label: preset.name,
    }));
});

function presetChanged(preset: Preset) {
    currentPresetId.value = preset.id;
    presets.value = getPresets();
    EditorUtils.setConfigFromPreset(props.config, currentPreset.value);
}

function createPreset(name: string, config?: PresetConfig) {
    presetChanged(addPreset(name, config || getPresetConfig(props.config)));
}

function deletePreset() {
    removePreset(currentPreset.value.id);
    presetChanged(presets.value[0]);
}

watch(
    () => currentPreset.value.id,
    () => {
        saveLastSelectedPreset(currentPreset.value.id);
        emit("presetChange", currentPreset.value);
    },
);

onMounted(() => {
    emit("presetChange", currentPreset.value);
});
</script>

<template>
    <div class="flex space-x-2">
        <UiFormGroup v-tooltip="{ content: $t('pages.editor.selectPreset') }" class="mb-0">
            <UiSelect
                v-model="currentPresetId"
                class="max-w-[150px]"
                :options="presetOptions"
                label-key="label"
                value-key="value"
            />
        </UiFormGroup>
        <div class="flex items-center">
            <UiButton
                v-if="isCustomPreset"
                v-tooltip="$t('pages.editor.removePreset')"
                variant="icon"
                size="icon"
                @click="deletePresetModal.open"
            >
                <UiIcon color="danger" :icon="Icons.Trash" />
            </UiButton>
            <UiButton v-tooltip="$t('pages.editor.savePreset')" variant="icon" size="icon" @click="addPresetModal.open">
                <UiIcon :icon="Icons.Add" />
            </UiButton>
            <UiButton v-tooltip="$t('pages.editor.import')" variant="icon" size="icon" @click="importModal.open">
                <UiIcon :icon="Icons.ImportCode" />
            </UiButton>
        </div>
    </div>
</template>

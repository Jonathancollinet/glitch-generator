<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { Icons } from "~/types/enums";
import {
    getPresets,
    updatePreset,
    type Preset,
    removePreset,
    addPreset,
    type PresetConfig,
    getLastSelectedPreset,
    saveLastSelectedPreset,
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

const currentPreset = ref<Preset>(getLastSelectedPreset());

const { addPresetModal } = useModalAddPreset(createPreset);
const { deletePresetModal } = useModalDeletePreset(deletePreset);

const presets = ref<Preset[]>(getPresets());
const { importModal } = useModalImport(props.glitch, createPreset);

function getPresetConfig() {
    return deepCopy({
        text: props.config.text,
        animation: props.config.animation,
        ranges: props.config.ranges,
    });
}

function presetChanged(preset: Preset) {
    currentPreset.value = preset;
    presets.value = getPresets();
    EditorUtils.setConfigFromPreset(props.config, currentPreset.value);
}

function createPreset(name: string, config?: PresetConfig) {
    presetChanged(addPreset(name, config || getPresetConfig()));
}

function savePreset() {
    currentPreset.value.config = getPresetConfig();
    updatePreset(currentPreset.value);
    presets.value = getPresets();
}

function deletePreset() {
    removePreset(currentPreset.value.id);
    presetChanged(presets.value[0]);
}

const isCustomPreset = computed(() => {
    return !currentPreset.value.builtIn;
});

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

defineExpose({
    savePreset,
});
</script>

<template>
    <div class="flex space-x-2">
        <UiFormGroup
            v-tooltip="{ content: $t('pages.editor.selectPreset') }"
            class="mb-0"
        >
            <UiSelect
                v-model="currentPreset"
                class="max-w-[120px]"
                :options="presets"
                label-key="name"
            />
        </UiFormGroup>
        <div :key="currentPreset.id" class="flex items-center">
            <UiButton
                v-if="isCustomPreset"
                v-tooltip="$t('pages.editor.removePreset')"
                variant="icon"
                size="icon"
                @click="deletePresetModal.open"
            >
                <UiIcon color="danger" :icon="Icons.Trash" />
            </UiButton>
            <UiButton
                v-tooltip="$t('pages.editor.savePreset')"
                variant="icon"
                size="icon"
                @click="addPresetModal.open"
            >
                <UiIcon :icon="Icons.Add" />
            </UiButton>
            <UiButton
                v-tooltip="$t('pages.editor.import')"
                variant="icon"
                size="icon"
                @click="importModal.open"
            >
                <UiIcon :icon="Icons.ImportCode" />
            </UiButton>
        </div>
    </div>
</template>

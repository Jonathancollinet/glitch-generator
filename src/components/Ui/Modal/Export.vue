<script lang="ts" setup>
import type Glitch from "~/lib/glitch";

const props = defineProps<{
    glitch: Glitch;
}>();

const emit = defineEmits<{
    cancel: [];
}>();

const data = props.glitch.getDataToExport();

function onCancel() {
    emit("cancel");
}

const tabs = computed(() => ({
    style: {
        label: "modals.export.style",
    },
    js: {
        label: "modals.export.js",
    },
    config: {
        label: "modals.export.config",
    },
}));
</script>

<template>
    <UiModal
        content-class="w-full"
        title="modals.export.title"
        @cancel="onCancel"
    >
        <UiText>{{ $t("modals.export.description") }}</UiText>
        <div class="w-full">
            <UiTabs :tabs="tabs">
                <template #default="{ activeTab }">
                    <div class="pt-4">
                        <UiFormGroup
                            v-if="activeTab === 'style'"
                            label="modals.export.style"
                            name="style"
                        >
                            <UiInput
                                type="textarea"
                                name="style"
                                class="h-64 w-full"
                                readonly
                                :model-value="data.css"
                            />
                        </UiFormGroup>
                        <UiFormGroup
                            v-if="activeTab === 'js'"
                            label="modals.export.js"
                            name="js"
                        >
                            <UiInput
                                type="textarea"
                                name="js"
                                class="h-64 w-full"
                                readonly
                                :model-value="data.js"
                            />
                        </UiFormGroup>
                        <UiFormGroup
                            v-if="activeTab === 'config'"
                            label="modals.export.config"
                            name="config"
                        >
                            <UiInput
                                type="textarea"
                                name="config"
                                class="h-64 w-full"
                                readonly
                                :model-value="data.config"
                            />
                        </UiFormGroup>
                    </div>
                </template>
            </UiTabs>
        </div>
        <template #footer>
            <UiButton variant="link" size="link" @click="onCancel">{{
                $t("modals.export.close")
            }}</UiButton>
        </template>
    </UiModal>
</template>

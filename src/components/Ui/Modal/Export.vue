<script lang="ts" setup>
import type Glitch from '~/glitch';

const props = defineProps<{
    glitch: Glitch
}>();

const emit = defineEmits<{
    cancel: []
}>();

const data = props.glitch.getDataToExport();

function onCancel() {
    emit('cancel')
}

const tabs = computed(() => ({
    "style": {
        label: 'modals.export.style',
    },
    "js": {
        label: 'modals.export.js',
    },
    "config": {
        label: 'modals.export.config',
    },
}));
</script>

<template>
    <UiModal contentClass="w-full" @cancel="onCancel" title="modals.export.title">
        <UiText>{{ $t('modals.export.description') }}</UiText>
        <div class="w-full">
            <UiTabs :tabs="tabs">
                <template v-slot="{ activeTab }">
                    <div class="pt-4">
                        <UiFormGroup v-if="activeTab === 'style'" label="modals.export.style" name="style">
                            <UiInput type="textarea" name="style" class="w-full h-64" readonly
                                :modelValue="data.css" />
                        </UiFormGroup>
                        <UiFormGroup v-if="activeTab === 'js'" label="modals.export.js" name="js">
                            <UiInput type="textarea" name="js" class="w-full h-64" readonly
                                :modelValue="data.js" />
                        </UiFormGroup>
                        <UiFormGroup v-if="activeTab === 'config'" label="modals.export.config" name="config">
                            <UiInput type="textarea" name="config" class="w-full h-64" readonly
                                :modelValue="data.config" />
                        </UiFormGroup>
                    </div>
                </template>
            </UiTabs>
        </div>
        <template #footer>
            <UiButton variant="link" size="link" @click="onCancel">{{ $t('modals.export.close') }}</UiButton>
        </template>
    </UiModal>
</template>
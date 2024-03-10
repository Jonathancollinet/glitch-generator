<script lang="ts" setup>
import type Glitch from '~/glitch';
import type { GlitchConfig } from '~/glitch/types';

const props = defineProps<{
    glitch: Glitch,
    config: GlitchConfig,
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
    "config": {
        label: 'modals.export.config',
    },
}));

const cssString = computed(() => {
    return `#text {\n${data.elementStyle}}\n\n${data.keyframes}`;
});

const configString = computed(() => {
    const config = props.config;

    return JSON.stringify({
        text: config.text,
        animation: config.animation,
        ranges: config.ranges,
    }, null, 2);
});
</script>

<template>
    <UiModal contentClass="w-auto" @cancel="onCancel" title="modals.export.title">
        <UiText>{{ $t('modals.export.description') }}</UiText>
        <div class="w-full">
            <UiTabs :tabs="tabs">
                <template v-slot="{ activeTab }">
                    <div class="pt-4">
                        <UiFormGroup v-if="activeTab === 'style'" label="modals.export.style" name="style">
                            <UiInput type="textarea" name="style" class="w-full h-56" readonly
                                :modelValue="cssString" />
                        </UiFormGroup>
                        <UiFormGroup v-if="activeTab === 'config'" label="modals.export.config" name="config">
                            <UiInput type="textarea" name="config" class="w-full h-56" readonly
                                :modelValue="configString" />
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
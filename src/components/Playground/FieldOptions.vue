<script lang="ts" setup>
import { GlitchAnimationProperty, type GlitchShadowField } from '~/glitch/types';
import { Icons } from '~/types/enums';

const props = defineProps<{
    selectedField?: GlitchShadowField,
    name: string
}>();

const emit = defineEmits<{
    reset: []
}>();

function reset() {
    emit('reset');
}

function getName(key: string) {
    return `${props.name}.${key}`;
}

const textShadow = computed(() => props.selectedField?.properties[GlitchAnimationProperty.TextShadow]);
const boxShadow = computed(() => props.selectedField?.properties[GlitchAnimationProperty.BoxShadow]);
</script>

<template>
    <div class="flex justify-between w-full sm:h-8">
        <div class="sm:flex items-center sm:space-x-8 w-full" v-if="selectedField">
            <UiHeading class="m-0 mb-2 sm:mb-0" variant="h3">
                {{ $t('pages.editor.config.field.offsetFrame') }} at {{ selectedField?.offsetFrame }}%
            </UiHeading>
            <div class="flex space-x-6">
                <div class="flex items-center" v-if="textShadow">
                    <EditorToolboxPropertyCommonOptions class="space-x-2 !mb-0" :errors="{}"
                        label="pages.editor.config.field.textShadow" :name="getName('textShadow')" v-model:config="textShadow"
                        v-model:localConfig="textShadow" />
                    <EditorToolboxPropertyColor class="sm:ml-4" v-if="textShadow.enabled" noLabel :errors="{}" name="textColor"
                        v-model:config="textShadow.color" v-model:localConfig="textShadow.color" />
                </div>
                <div class="flex items-center" v-if="boxShadow">
                    <EditorToolboxPropertyCommonOptions class="space-x-2 !mb-0" :errors="{}"
                        label="pages.editor.config.field.boxShadow" :name="getName('boxShadow')" v-model:config="boxShadow"
                        v-model:localConfig="boxShadow" />
                    <EditorToolboxPropertyColor class="sm:ml-4" v-if="boxShadow.enabled" noLabel :errors="{}" name="textColor"
                        v-model:config="boxShadow.color" v-model:localConfig="boxShadow.color" />
                </div>
            </div>
        </div>
        <div class="flex items-center first:justify-end first:w-full">
            <OpenShortcuts />
            <UiButton v-tooltip="$t('pages.editor.config.refresh')" variant="icon" size="icon" @click="reset">
                <UiIcon :icon="Icons.Refresh" />
            </UiButton>
        </div>
    </div>
</template>
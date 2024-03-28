<script lang="ts" setup>
import { Icons } from "~/types/enums";
import G from "~/lib/glitch/types";

const props = defineProps<{
    name: string;
}>();

const field = defineModel<G.Field | undefined>();

const emit = defineEmits<{
    reset: [];
}>();

function reset() {
    emit("reset");
}

function getName(key: string) {
    return `${props.name}.${key}`;
}

const textShadow = computed<G.Shadow | undefined>({
    get() {
        return field.value?.shadows[G.PropertyName.TextShadow];
    },
    set(value: G.Shadow | undefined) {
        field.value!.shadows[G.PropertyName.TextShadow] = value;
    },
});

const boxShadow = computed<G.Shadow | undefined>({
    get() {
        return field.value?.shadows[G.PropertyName.BoxShadow];
    },
    set(value: G.Shadow | undefined) {
        field.value!.shadows[G.PropertyName.BoxShadow] = value;
    },
});
</script>

<template>
    <div class="flex w-full justify-between sm:h-8">
        <div v-if="field" class="w-full items-center sm:flex sm:space-x-8">
            <UiHeading class="m-0 mb-2 sm:mb-0" variant="h3">
                {{ $t("pages.editor.config.field.offsetFrame") }} at {{ field.offsetFrame }}%
            </UiHeading>
            <div class="flex space-x-6">
                <div v-if="textShadow" class="flex items-center">
                    <EditorToolboxPropertyCommonOptions
                        v-model:config="textShadow"
                        v-model:localConfig="textShadow"
                        class="!mb-0 space-x-2"
                        :errors="{}"
                        label="pages.editor.config.field.textShadow"
                        :name="getName('textShadow')"
                    />
                    <EditorToolboxPropertyColor
                        v-if="textShadow.enabled"
                        v-model:config="textShadow.color"
                        v-model:localConfig="textShadow.color"
                        class="sm:ml-4"
                        no-label
                        :errors="{}"
                        name="textColor"
                    />
                </div>
                <div v-if="boxShadow" class="flex items-center">
                    <EditorToolboxPropertyCommonOptions
                        v-model:config="boxShadow"
                        v-model:localConfig="boxShadow"
                        class="!mb-0 space-x-2"
                        :errors="{}"
                        label="pages.editor.config.field.boxShadow"
                        :name="getName('boxShadow')"
                    />
                    <EditorToolboxPropertyColor
                        v-if="boxShadow.enabled"
                        v-model:config="boxShadow.color"
                        v-model:localConfig="boxShadow.color"
                        class="sm:ml-4"
                        no-label
                        :errors="{}"
                        name="textColor"
                    />
                </div>
            </div>
        </div>
        <div class="flex items-center first:w-full first:justify-end">
            <OpenShortcuts />
            <UiButton v-tooltip="$t('pages.editor.config.refresh')" variant="icon" size="icon" @click="reset">
                <UiIcon :icon="Icons.Refresh" />
            </UiButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import G from "~/lib/glitch/types";
import { Icons } from "~/types/enums";
import { applyUpdater, getPossibleOffsetFrames } from "~/lib/toolbox/utils";

defineProps<{
    errors: Partial<G.Errors>;
    range: G.Field[];
}>();

const emit = defineEmits<{
    onSelectedTab: [tab: G.PropertyName];
    removeField: [field: G.Field];
}>();

const field = defineModel<G.Field>({ required: true });
const localField = ref<G.Field>(deepCopy(field.value));

const defaultField = getDefaultField(0, 0, 0);
const defaultTextShadow = deepCopy(defaultField.shadows[G.PropertyName.TextShadow]) as G.Shadow;
const defaultBoxShadow = deepCopy(defaultField.shadows[G.PropertyName.BoxShadow]) as G.Shadow;

const textShadow = ref(field.value.shadows[G.PropertyName.TextShadow] || defaultTextShadow);
const localTextShadow = ref(localField.value.shadows[G.PropertyName.TextShadow] || defaultTextShadow);
const boxShadow = ref(field.value.shadows[G.PropertyName.BoxShadow] || defaultBoxShadow);
const localBoxShadow = ref(localField.value.shadows[G.PropertyName.BoxShadow] || defaultBoxShadow);
const fieldName = `ranges[${field.value.range}][${field.value.index}]`;
const updateField = applyUpdater<G.Field>({
    obj: field.value,
    localObj: localField.value,
});

const updateOffsetFrame = updateField({
    key: "offsetFrame",
    modifier: Number,
});

function propertyCardClass(property: G.Shadow) {
    const notEnabledClasses = "text-neutral-400 opacity-50 hover:opacity-100";
    const cls: ClassValue[] = ["border-transparent"];

    cls.push((!property.enabled && notEnabledClasses) || "");

    return cn(cls);
}

function removeField() {
    emit("removeField", field.value);
}

watch(
    field.value,
    () => {
        if (field.value) {
            localField.value = deepCopy(field.value);
        }
    },
    { deep: true },
);
</script>

<template>
    <UiCard no-content-pad>
        <template #title>
            <div class="flex items-center justify-between">
                <div class="flex">
                    <UiHeading class="m-0" variant="h3">
                        {{ $t("pages.editor.config.field.offsetFrame") }}
                    </UiHeading>
                    <UiFormGroup class="m-0 ml-3" variant="inline" name="offsetFrame">
                        <UiSelect
                            class="w-12 bg-transparent"
                            :model-value="localField.offsetFrame"
                            :options="getPossibleOffsetFrames(localField, range)"
                            @change="updateOffsetFrame"
                        />
                    </UiFormGroup>
                    <UiHeading class="m-0 flex items-center pl-2" variant="h4">%</UiHeading>
                </div>
                <div class="flex">
                    <UiIcon
                        v-tooltip="$t('pages.editor.config.field.removeField')"
                        color="danger"
                        class="cursor-pointer"
                        :icon="Icons.Trash"
                        @click="removeField"
                    />
                </div>
            </div>
        </template>

        <template #content>
            <UiCard openable :class="propertyCardClass(textShadow)" content-classes="pr-0">
                <template #content>
                    <EditorToolboxPropertyTextShadow
                        v-model:config="textShadow"
                        v-model:localConfig="localTextShadow"
                        :errors="errors"
                        :name="`${fieldName}.shadows.text-shadow`"
                    />
                </template>
            </UiCard>
            <UiCard openable :class="propertyCardClass(boxShadow)" content-classes="pr-0">
                <template #content>
                    <EditorToolboxPropertyBoxShadow
                        v-model:config="boxShadow"
                        v-model:localConfig="localBoxShadow"
                        :errors="errors"
                        :name="`${fieldName}.shadows.box-shadow`"
                    />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

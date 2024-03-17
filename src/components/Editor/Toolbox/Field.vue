<script lang="ts" setup>
import type { ClassValue } from "class-variance-authority/types";
import G from "~/glitch/types";
import { Icons } from "~/types/enums";
import { applyUpdater, getPossibleOffsetFrames } from "~/utils/Toobox/utils";

defineProps<{
    errors: Partial<G.Errors>;
    range: G.Field[];
}>();

const emit = defineEmits<{
    onSelectedTab: [tab: G.PropertyName];
    removeField: [field: G.Field];
}>();

const field = defineModel<G.Field>("config", { required: true });
const localField = defineModel<G.Field>("localConfig", {
    required: true,
});

const defaultField = getDefaultField(0, 0, 0);
const defaultTextShadow = deepCopy(
    defaultField.properties[G.PropertyName.TextShadow],
) as G.Property;
const defaultBoxShadow = deepCopy(
    defaultField.properties[G.PropertyName.BoxShadow],
) as G.Property;

const textShadow = ref(
    field.value.properties[G.PropertyName.TextShadow] || defaultTextShadow,
);
const localTextShadow = ref(deepCopy(textShadow.value));
const boxShadow = ref(
    field.value.properties[G.PropertyName.BoxShadow] || defaultBoxShadow,
);
const localBoxShadow = ref(deepCopy(boxShadow.value));

const fieldName = `ranges[${field.value.range}][${field.value.index}]`;
const updateField = applyUpdater<G.Field>({
    obj: field.value,
    localObj: localField.value,
});

const updateOffsetFrame = updateField({
    key: "offsetFrame",
    modifier: Number,
});

function propertyCardClass(property: G.Property) {
    const notEnabledClasses = "text-neutral-400 opacity-50 hover:opacity-100";
    const cls: ClassValue[] = ["border-transparent"];

    cls.push((!property.enabled && notEnabledClasses) || "");

    return cn(cls);
}

function removeField() {
    emit("removeField", field.value);
}
</script>

<template>
    <UiCard no-content-pad>
        <template #title>
            <div class="flex items-center justify-between">
                <div class="flex">
                    <UiHeading class="m-0" variant="h3">
                        {{ $t("pages.editor.config.field.offsetFrame") }}
                    </UiHeading>
                    <UiFormGroup
                        class="m-0 ml-3"
                        variant="inline"
                        name="offsetFrame"
                    >
                        <UiSelect
                            class="bg-transparent"
                            :model-value="localField.offsetFrame"
                            :options="
                                getPossibleOffsetFrames(localField, range)
                            "
                            @change="updateOffsetFrame"
                        />
                    </UiFormGroup>
                    <UiHeading class="m-0 flex items-center pl-2" variant="h4"
                        >%</UiHeading
                    >
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
            <UiCard
                openable
                :class="propertyCardClass(textShadow)"
                content-classes="pr-0"
            >
                <template #content>
                    <EditorToolboxPropertyTextShadow
                        v-model:config="textShadow"
                        v-model:localConfig="localTextShadow"
                        :errors="errors"
                        :name="`${fieldName}.properties.text-shadow`"
                    />
                </template>
            </UiCard>
            <UiCard
                openable
                :class="propertyCardClass(boxShadow)"
                content-classes="pr-0"
            >
                <template #content>
                    <EditorToolboxPropertyBoxShadow
                        v-model:config="boxShadow"
                        v-model:localConfig="localBoxShadow"
                        :errors="errors"
                        :name="`${fieldName}.properties.box-shadow`"
                    />
                </template>
            </UiCard>
        </template>
    </UiCard>
</template>

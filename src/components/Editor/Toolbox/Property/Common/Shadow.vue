<script setup lang="ts">
import G from "~/lib/glitch/types";
import { applyUpdater, getErrorMessage } from "~/lib/toolbox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
    name: string;
    propertyName: string;
}>();

const property = defineModel<G.Shadow>("config", {
    required: true,
});
const localProperty = defineModel<G.Shadow>("localConfig", {
    required: true,
});

const offsetXError = computed(() => getErrorMessage(props.errors, `${props.name}.offsetX`));
const offsetYError = computed(() => getErrorMessage(props.errors, `${props.name}.offsetY`));
const blurError = computed(() => getErrorMessage(props.errors, `${props.name}.blur`));

const updateShadow = computed(() =>
    applyUpdater<G.Shadow>({
        obj: property.value,
        localObj: localProperty.value,
    }),
);

const updateOffsetX = computed(() =>
    updateShadow.value({
        key: "offsetX",
        modifier: Number,
        debounced: 5,
    }),
);

const updateOffsetY = computed(() =>
    updateShadow.value({
        key: "offsetY",
        modifier: Number,
        debounced: 5,
    }),
);

const updateBlur = computed(() =>
    updateShadow.value({
        key: "blur",
        modifier: Number,
        debounced: 5,
    }),
);

function getName(key: string) {
    return `${props.name}.${key}`;
}
</script>

<template>
    <EditorToolboxPropertyCommonOptions
        v-model:config="property"
        v-model:localConfig="localProperty"
        :name="propertyName"
        :errors="errors"
    />
    <div v-if="property.enabled" class="flex flex-wrap">
        <EditorToolboxPropertyColor
            v-model:config="property.color"
            v-model:localConfig="localProperty.color"
            label-name="textColor"
            :name="name"
            :errors="errors"
        />
        <UiInputWithRange
            label="pages.editor.config.field.offsetX"
            :value="localProperty.offsetX"
            :name="getName('offsetX')"
            :error="offsetXError"
            :update="updateOffsetX"
        />
        <UiInputWithRange
            label="pages.editor.config.field.offsetY"
            :value="localProperty.offsetY"
            :name="getName('offsetY')"
            :error="offsetYError"
            :update="updateOffsetY"
        />
        <UiInputWithRange
            label="pages.editor.config.field.blur"
            min="0"
            :value="localProperty.blur"
            :name="getName('blur')"
            :error="blurError"
            :update="updateBlur"
        />
        <slot />
    </div>
</template>

<script lang="ts" setup>
import G from "~/lib/glitch/types";
import { applyUpdater, getErrorMessage } from "~/lib/toolbox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
    name: string;
}>();

const property = defineModel<G.Declarations.BoxShadow>("config", {
    required: true,
});
const localProperty = defineModel<G.Declarations.BoxShadow>("localConfig", {
    required: true,
});

const spreadError = computed(() => getErrorMessage(props.errors, `${props.name}.spread`));

const updateBoxShadow = computed(() =>
    applyUpdater<G.Declarations.BoxShadow>({
        obj: property.value,
        localObj: localProperty.value,
    }),
);

const updateSpread = computed(() =>
    updateBoxShadow.value({
        key: "spread",
        modifier: Number,
        debounced: 100,
    }),
);

function getName(key: string) {
    return `${props.name}.${key}`;
}
</script>

<template>
    <div>
        <EditorToolboxPropertyCommonShadow
            v-model:config="property"
            v-model:localConfig="localProperty"
            property-name="boxShadow"
            :name="name"
            :errors="errors"
        >
            <UiInputWithRange
                label="pages.editor.config.field.spread"
                min="0"
                :value="localProperty.spread"
                :name="getName('spread')"
                :error="spreadError"
                :update="updateSpread"
            />
        </EditorToolboxPropertyCommonShadow>
    </div>
</template>

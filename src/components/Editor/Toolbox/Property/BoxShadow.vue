<script lang="ts" setup>
import G from "~/glitch/types";
import { applyUpdater, getErrorMessage } from "~/utils/Toobox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
    name: string;
}>();

const property = defineModel<G.Property>("config", {
    required: true,
});
const localProperty = defineModel<G.Property>("localConfig", {
    required: true,
});

const spreadError = computed(() => getErrorMessage(props.errors, "spread"));

const updateBoxShadow = applyUpdater<G.Property>({
    obj: property.value,
    localObj: localProperty.value,
});

const updateSpread = updateBoxShadow({
    key: "spread",
    modifier: Number,
    debounced: 100,
});

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
            <EditorToolboxFieldPropertyWithRange
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

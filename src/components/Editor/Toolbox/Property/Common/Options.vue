<script lang="ts" setup>
import G from "~/glitch/types";
import { applyUpdater, getErrorMessage } from "~/utils/Toobox/utils";

const props = defineProps<{
    errors: Partial<G.Errors>;
    name: string;
    label?: string;
}>();

const property = defineModel<G.Property>("config", {
    required: true,
});
const localProperty = defineModel<G.Property>("localConfig", {
    required: true,
});

const enabledError = computed(() => getErrorMessage(props.errors, "enabled"));
const fillAllFramesError = computed(() =>
    getErrorMessage(props.errors, "fillAllFrames"),
);

const updateOptions = applyUpdater<G.Property>({
    obj: property.value,
    localObj: localProperty.value,
});

const updateEnabled = updateOptions({
    key: "enabled",
    modifier: Boolean,
});

const updateFillAllFrames = updateOptions({
    key: "fillAllFrames",
    modifier: Boolean,
});

function getName(key: string) {
    return `${props.name}.${key}`;
}
</script>

<template>
    <div class="mb-2 flex justify-between *:m-0 last:mb-0">
        <UiCheckbox
            :label="label || `pages.editor.config.field.${name}`"
            :name="getName('enabled')"
            :checked="localProperty.enabled"
            :update-fn="updateEnabled"
            :error="enabledError"
        />
        <UiCheckbox
            v-if="property.enabled"
            :label="`pages.editor.config.field.fillAllFrames`"
            :name="getName('fillAllFrames')"
            :checked="localProperty.fillAllFrames"
            :update-fn="updateFillAllFrames"
            :error="fillAllFramesError"
        />
    </div>
</template>

<script lang="ts" setup>
import { getShadowPositions } from "~/lib/glitch/propertitesData";
import G from "~/lib/glitch/types";

const props = defineProps<{
    field: G.Field;
    propertyName: G.PropertyName;
}>();

const property = computed(() => {
    return props.field?.shadows?.[props.propertyName];
});

const formatProperty = computed(() => {
    const shadow = property.value;

    if (shadow) {
        let values = getShadowPositions(shadow);

        if (shadow.spread) {
            values += ` ${shadow.spread}px`;
        }

        return values;
    }
});
</script>

<template>
    <div v-if="property?.enabled" class="space-y-1 text-xs">
        <div class="flex">
            <div class="font-bold underline">"{{ propertyName }}":</div>
            <div class="ml-1 font-bold">
                <template v-if="!property.fillAllFrames"> {{ field.offsetFrame }}% </template>
                <template v-else>{{ $t("pages.editor.config.field.all") }}</template>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="h-4 w-4">
                <EditorFieldColorDisplay :color="property.color" />
            </div>
            <div>{{ formatProperty }}</div>
        </div>
    </div>
</template>

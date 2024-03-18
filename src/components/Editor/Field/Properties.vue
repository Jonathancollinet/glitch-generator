<script lang="ts" setup>
import G from "~/lib/glitch/types";

defineProps<{
    field: G.Field | undefined;
    nextHoveredFrameOffset: number;
}>();
</script>

<template>
    <div v-if="field" class="space-y-2">
        <div class="font-bold">
            <template
                v-if="
                    field.offsetFrame < 100 &&
                    field.offsetFrame !== nextHoveredFrameOffset - 1
                "
            >
                {{ field.offsetFrame }}->{{ nextHoveredFrameOffset - 1 }}%
            </template>
            <template v-else> {{ field.offsetFrame }}% </template>
        </div>
        <EditorFieldProperty
            :field="field"
            :property-name="G.PropertyName.TextShadow"
        />
        <EditorFieldProperty
            :field="field"
            :property-name="G.PropertyName.BoxShadow"
        />
    </div>
</template>

<script lang="ts" setup>
import G from "~/lib/glitch/types";

defineProps<{
    errors: Partial<G.Errors>;
    name: string;
}>();

const property = defineModel<G.Property>("config", {
    required: true,
});
const localProperty = defineModel<G.Property>("localConfig", {
    required: true,
});
</script>

<template>
    <div>
        <EditorToolboxPropertyCommonShadow
            v-model:config="property"
            v-model:localConfig="localProperty"
            property-name="textShadow"
            :name="name"
            :errors="errors"
        />
    </div>
</template>

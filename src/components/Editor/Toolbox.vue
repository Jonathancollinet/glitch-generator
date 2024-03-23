<script setup lang="ts">
import type { EditorToolboxAnimation } from "#build/components";
import G from "~/lib/glitch/types";

defineProps<{
    errors: Partial<G.Errors>;
    currentPercent: number;
}>();

const config = defineModel<G.Config>("config", { required: true });
const localeConfig = ref<G.Config>(deepCopy(config.value));

watch(
    () => config.value,
    (value) => {
        localeConfig.value = deepCopy(value);
    },
    { deep: true },
);
</script>

<template>
    <div class="md:space-x-0 md:space-y-4">
        <EditorToolboxAnimation
            v-model:config="config.animation"
            v-model:localConfig="localeConfig.animation"
            :errors="errors"
        />
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localeConfig.text" :errors="errors" />
    </div>
</template>

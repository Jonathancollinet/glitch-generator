<script setup lang="ts">
import type { EditorToolboxAnimation } from "#build/components";
import G from "~/lib/glitch/types";

defineProps<{
    errors: Partial<G.Errors>;
    currentPercent: number;
}>();

const emit = defineEmits<{
    addField: [rangeIndex: number];
    removeRange: [index: number];
    addEmptyRange: [];
    duplicateRange: [];
    removeField: [field: G.Field];
}>();

const config = defineModel<G.Config>("config", { required: true });
const selectedField = defineModel<G.Field | undefined>("field", {
    required: true,
});

const localConfig = ref<G.Config>(deepCopy(config.value));
const localSelectedField = ref<G.Field>();

const currentIndexes = computed(() => {
    return selectedField.value
        ? `${selectedField.value.range}-${selectedField.value.index}`
        : "";
});

function removeField(field: G.Field) {
    emit("removeField", field);
}

watch(
    selectedField,
    (field) => {
        if (field) {
            localSelectedField.value = deepCopy(field);
        }
    },
    { deep: true },
);
</script>

<template>
    <div class="sticky top-4 md:space-x-0 md:space-y-4">
        <div v-if="selectedField && localSelectedField" class="mb-4">
            <EditorToolboxField
                :key="currentIndexes"
                v-model:config="selectedField"
                v-model:localConfig="localSelectedField"
                :range="config.ranges[selectedField.range]"
                :errors="errors"
                @remove-field="removeField"
            />
        </div>
        <EditorToolboxAnimation
            v-model:config="config.animation"
            v-model:localConfig="localConfig.animation"
            :errors="errors"
        />
        <EditorToolboxText
            v-model:config="config.text"
            v-model:localConfig="localConfig.text"
            :errors="errors"
        />
    </div>
</template>

<script lang="ts" setup>
import { addFieldAtOffset, getHoveredField } from "~/lib/editor/utils";
import Glitch from "~/lib/glitch";
import G from "~/lib/glitch/types";

const props = defineProps<{
    ranges?: G.Field[][];
    name: string;
}>();

const config = getDefaultGlitchConfig();
config.ranges = deepCopy(props.ranges || config.ranges);

const gconfig = ref(config);
const keyframes = ref("");
const selectedField = ref<G.Field>();

const glitch = new Glitch(gconfig.value);

function compute() {
    glitch.computeConfig(gconfig.value, true);
    keyframes.value = glitch.getKeyframesString();
}

function selectField(field: G.Field) {
    selectedField.value = field;
}

function insertField(rangeIndex: number, offset: number) {
    const hoveredField = getHoveredField(gconfig.value.ranges[rangeIndex], offset);

    addFieldAtOffset(gconfig.value.ranges, rangeIndex, hoveredField.index + 1, offset);
}

function reset() {
    gconfig.value.ranges = deepCopy(props.ranges || config.ranges);
    selectField(gconfig.value.ranges[0][0]);
}

watch(
    () => gconfig.value.ranges,
    () => {
        compute();
    },
    { deep: true },
);

onMounted(() => {
    compute();
    selectField(gconfig.value.ranges[0][0]);
});
</script>

<template>
    <div class="border-2 bg-primary-200 p-4 dark:bg-primary-950">
        <PlaygroundFieldOptions v-model="selectedField" :name="name" class="mb-2" @reset="reset" />
        <PlaygroundRanges
            class="mb-4"
            :ranges="gconfig.ranges"
            :selected-field="selectedField"
            @select-field="selectField"
            @insert-field="insertField"
        />
        <UiPre class="p-0">{{ keyframes }}</UiPre>
    </div>
</template>

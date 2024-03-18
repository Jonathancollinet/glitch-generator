<script lang="ts" setup>
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
const refresh = ref(0);

const glitch = new Glitch(gconfig.value);

function compute() {
    glitch.computeConfig(gconfig.value, true);
    keyframes.value = glitch.getKeyframesString();
}

function selectField(field: G.Field) {
    selectedField.value = field;
}

function reset() {
    gconfig.value.ranges = deepCopy(props.ranges || config.ranges);
    selectField(gconfig.value.ranges[0][0]);
    ++refresh.value;
}

const selectedIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : "";
});

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
    <div :key="refresh" class="bg-primary-200 p-4 dark:bg-primary-950">
        <PlaygroundFieldOptions
            :key="selectedIndexes"
            :name="name"
            class="mb-2"
            :selected-field="selectedField"
            @reset="reset"
        />
        <PlaygroundRanges
            class="mb-4"
            :ranges="gconfig.ranges"
            :selected-field="selectedField"
            @select-field="selectField"
        />
        <UiPre class="p-0">{{ keyframes }}</UiPre>
    </div>
</template>

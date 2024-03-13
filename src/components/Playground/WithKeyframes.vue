<script lang="ts" setup>
import Glitch from '~/glitch';
import type { GlitchShadowField } from '~/glitch/types';

const props = defineProps<{
    ranges?: GlitchShadowField[][],
    name: string,
}>();

const config = getDefaultGlitchConfig();
config.ranges = deepCopy(props.ranges || config.ranges);

const gconfig = ref(config);
const keyframes = ref("");
const selectedField = ref<GlitchShadowField>();
const refresh = ref(0);

const glitch = new Glitch(gconfig.value);

function compute() {
    glitch.computeConfig(gconfig.value, true);
    keyframes.value = glitch.getKeyframesString();
}

function selectField(field: GlitchShadowField) {
    selectedField.value = field;
}

function reset() {
    gconfig.value.ranges = deepCopy(props.ranges || config.ranges);
    selectedField.value = undefined;
    ++refresh.value;
}

const selectedIndexes = computed(() => {
    return selectedField.value ? `${selectedField.value.range}-${selectedField.value.index}` : '';
});

watch(() => gconfig.value.ranges, () => {
    compute();
}, { deep: true });

onMounted(() => {
    compute();
});
</script>

<template>
    <div class="p-4 bg-primary-200 dark:bg-primary-950" :key="refresh">
        <PlaygroundFieldOptions :key="selectedIndexes" :name="name" class="mb-2" :selectedField="selectedField" @reset="reset" />
        <PlaygroundRanges class="mb-4" :ranges="gconfig.ranges" @selectField="selectField" />
        <UiPre class="p-0">{{ keyframes }}</UiPre>
    </div>
</template>
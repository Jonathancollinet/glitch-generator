<script lang="ts" setup>
import { Icons } from "~/types/enums";
import G from "~/lib/glitch/types";
import { rangeHeight } from "~/utils/constants";

defineProps<{
    selectedField?: G.Field;
    config: G.Config;
    currentPercent: number;
}>();

const emit = defineEmits<{
    updateField: [field: G.Field];
    selectField: [field: G.Field];
    addEmptyRange: [];
    duplicateRange: [rangeIndex: number];
    reversePositions: [rangeIndex: number];
    reverseColors: [rangeIndex: number];
    removeRange: [rangeIndex: number];
    insertField: [rangeIndex: number, offset: number];
}>();

const onRangeOptions = {
    removeRange,
    duplicateRange,
    reversePositions,
    reverseColors,
};

function updateField(field: G.Field) {
    emit("updateField", field);
}

function insertField(rangeIndex: number, offset: number) {
    emit("insertField", rangeIndex, offset);
}

function removeRange(rangeIndex: number) {
    emit("removeRange", rangeIndex);
}

function duplicateRange(rangeIndex: number) {
    emit("duplicateRange", rangeIndex);
}

function reversePositions(rangeIndex: number) {
    emit("reversePositions", rangeIndex);
}

function reverseColors(rangeIndex: number) {
    emit("reverseColors", rangeIndex);
}

function addEmptyRange() {
    emit("addEmptyRange");
}

function selectField(field: G.Field) {
    emit("selectField", field);
}
</script>

<template>
    <div class="relative">
        <div class="mb-2 flex items-center space-x-2">
            <UiHeading class="m-0" variant="h3">{{
                $t("pages.editor.ranges")
            }}</UiHeading>
            <OpenShortcuts class="mt-1" />
        </div>
        <div class="mb-4 flex">
            <div class="relative z-10 w-[calc(100%-36px)]">
                <ClientOnly>
                    <EditorKeyframesCursor
                        v-if="config.controls"
                        :current-percent="currentPercent"
                    />
                </ClientOnly>
                <EditorToolboxRange
                    v-for="(range, index) in config.ranges"
                    :key="`${index}-${range.length}`"
                    :selected-field="selectedField"
                    :config="config"
                    :range="range"
                    @update-field="updateField"
                    @select-field="selectField"
                    @insert-field="insertField(index, $event)"
                />
            </div>
            <div class="w-[36px]">
                <div
                    v-for="(range, index) in config.ranges"
                    :key="index"
                    class="relative top-0 mb-2 flex w-full items-center pl-[12px] last:mb-0"
                    :style="{ height: rangeHeight + 'px' }"
                >
                    <EditorToolboxRangeOptions
                        :range-index="index"
                        :config="config"
                        v-on="onRangeOptions"
                    />
                </div>
            </div>
        </div>
        <div class="flex space-x-2">
            <UiButton
                v-tooltip="
                    $t('pages.editor.config.ranges.actions.addEmptyRange')
                "
                variant="link"
                size="link"
                @click="addEmptyRange"
            >
                <UiIcon :icon="Icons.Add" />
            </UiButton>
        </div>
    </div>
</template>

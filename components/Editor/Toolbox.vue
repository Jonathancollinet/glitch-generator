<script setup lang="ts">
import type { EditorToolboxAnimation } from '#build/components';
import type { GlitchConfig, GlitchErrors, GlitchShadowField, OptionnalGlitchShadowField } from '~/glitch/types';

defineProps<{
    errors: Partial<GlitchErrors>
}>()

const emit = defineEmits<{
    updateFields: [fields: GlitchShadowField[]]
}>()

const config = defineModel<GlitchConfig>({ required: true });

const localConfig = ref<GlitchConfig>(deepCopy(config.value));
const selectedFields = ref<GlitchShadowField[]>([]);

function selectField(field: GlitchShadowField) {
    // ctrl + click on a field
    selectedFields.value.push(field);
}

function selectUniqueField(field: GlitchShadowField) {
    // simple click on a field
    selectedFields.value.length = 0;
    selectedFields.value.push(field)
}

function shiftSelect(selectedField: GlitchShadowField) {
    const isOpened = selectedFields.value.includes(selectedField);
    if (isOpened) {
        selectedFields.value.splice(selectedFields.value.indexOf(selectedField), 1);
    }
    selectedFields.value.push(selectedField);
}

function selectPreviousFieldFrom(lastSelectedFieldIndex: number, currentFieldIndex: number, currentFieldRange: number) {
    for (let i = lastSelectedFieldIndex - 1; i >= currentFieldIndex; --i) {
        shiftSelect(localConfig.value.ranges[currentFieldRange][i]);
    }
}

function selectNextFieldFrom(lastSelectedFieldIndex: number, currentFieldIndex: number, currentFieldRange: number) {
    for (let i = lastSelectedFieldIndex + 1; i <= currentFieldIndex; ++i) {
        shiftSelect(localConfig.value.ranges[currentFieldRange][i]);
    }
}

function runThroughtPreviousRange(lastSelectedFieldRange: number, currentFieldRange: number, lastSelectedFieldIndex: number, currentFieldIndex: number) {
    for (let i = lastSelectedFieldRange; i >= currentFieldRange; --i) {
        let j, stop;
        if (i === lastSelectedFieldRange) {
            j = lastSelectedFieldIndex;
            stop = 0;
        } else if (i === currentFieldRange) {
            j = localConfig.value.ranges[i].length - 1;
            stop = currentFieldIndex;
        } else {
            j = localConfig.value.ranges[i].length - 1;
            stop = 0;
        }
        for (; j >= stop; --j) {
            shiftSelect(localConfig.value.ranges[i][j]);
        }
    }
}

function runThroughtNextRange(lastSelectedFieldRange: number, currentFieldRange: number, lastSelectedFieldIndex: number, currentFieldIndex: number) {
    for (let i = lastSelectedFieldRange; i <= currentFieldRange; ++i) {
        let j, stop;
        if (i === lastSelectedFieldRange) {
            j = lastSelectedFieldIndex;
            stop = localConfig.value.ranges[i].length;
        } else if (i === currentFieldRange) {
            j = 0;
            stop = currentFieldIndex + 1;
        } else {
            j = 0;
            stop = localConfig.value.ranges[i].length;
        }
        for (; j < stop; ++j) {
            shiftSelect(localConfig.value.ranges[i][j]);
        }
    }
}

function selectAllFieldsTo(field: GlitchShadowField) {
    // shift + click on a field
    if (selectedFields.value.length === 0) {
        selectField(field);
    } else {
        const currentFieldRange = field.range;
        const currentFieldIndex = field.index;
        const lastSelectField = selectedFields.value[selectedFields.value.length - 1];
        const lastSelectedFieldIndex = lastSelectField.index;
        const lastSelectedFieldRange = lastSelectField.range;

        if (currentFieldRange !== lastSelectedFieldRange) {
            if (currentFieldRange < lastSelectedFieldRange) {
                runThroughtPreviousRange(lastSelectedFieldRange, currentFieldRange, lastSelectedFieldIndex, currentFieldIndex)
            } else {
                runThroughtNextRange(lastSelectedFieldRange, currentFieldRange, lastSelectedFieldIndex, currentFieldIndex)
            }
        } else {
            // works only for the same range
            if (currentFieldIndex < lastSelectedFieldIndex) {
                selectPreviousFieldFrom(lastSelectedFieldIndex, currentFieldIndex, currentFieldRange)
            } else {
                selectNextFieldFrom(lastSelectedFieldIndex, currentFieldIndex, currentFieldRange)
            }
        }

    }

}

function deselectField(field: GlitchShadowField) {
    // ctrl + click on a selected field
    const index = selectedFields.value.findIndex((selectedField) => selectedField.range === field.range && selectedField.index === field.index);
    if (index > -1) {
        selectedFields.value.splice(index, 1);
    }
}

function updateFields(field: OptionnalGlitchShadowField) {
    const fields = selectedFields.value.map((selectedField) => {
        const data = {
            ...deepCopy(selectedField),
            ...deepCopy(field)
        };

        return data;
    }) as GlitchShadowField[];

    emit('updateFields', fields);
}

</script>

<template>
    <div>
        <EditorToolboxText v-model:config="config.text" v-model:localConfig="localConfig.text" :errors="errors" />
        <EditorToolboxAnimation v-model:config="config.animation" v-model:localConfig="localConfig.animation" :errors="errors" />
        <EditorToolboxField v-if="selectedFields.length" :config="localConfig" :errors="errors" :selectedFields="selectedFields" @update="updateFields" />
        <EditorToolboxRanges v-model:config="config.ranges" v-model:localConfig="localConfig.ranges" :errors="errors" :selectedFields="selectedFields"
            @selectAllFieldsTo="selectAllFieldsTo" @selectField="selectField" @selectUniqueField="selectUniqueField" @deselectField="deselectField" />
    </div>
</template>

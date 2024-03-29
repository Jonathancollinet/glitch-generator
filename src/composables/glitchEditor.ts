import G from "~/lib/glitch/types";
import { type Preset } from "~/lib/toolbox/presets";
import Glitch from "~/lib/glitch";
import * as EditorUtils from "~/lib/editor/utils";

export const useGlitchEditor = (onSavePreset: () => void) => {
    const currentPercent = ref(0);
    const errors = ref<Partial<G.Errors>>({});
    const glitchedEl = ref<HTMLElement | null>(null);
    const selectedField = ref<G.Field>();
    const currentPreset = ref<Preset>();
    const gconfig = ref<G.Config>(getDefaultGlitchConfig());
    const bindings = ref<G.Bindings>({
        message: "",
        textStyle: {
            fontSize: "",
            padding: "",
            borderRadius: "",
            height: "",
            backgroundColor: "",
            color: "",
        },
    });

    const hasValidDuration = computed(() => {
        return !errors.value["animation.duration"];
    });

    const currentFieldKey = computed(() => {
        return `${currentPreset.value?.id}-${selectedField.value?.range}-${selectedField.value?.index}`;
    });

    const isCustomPreset = computed(() => {
        const preset = currentPreset.value;

        return preset && !preset.builtIn;
    });

    const onRangesEvents = {
        updateField,
        selectField,
        addEmptyRange,
        duplicateRange,
        reversePositions,
        reverseColors,
        removeRange,
        insertField,
    };

    const onToolboxEvents = {
        closeField,
        presetChanged,
        onAnimationUpdate,
    };

    let animationDuration = gconfig.value.animation.duration;
    let selectingField = false;

    const glitch = new Glitch(gconfig.value);

    gconfig.value.preventRangesCompute = true;

    gconfig.value.onValidated = (errs: G.Errors | undefined) => {
        if (errs) {
            errors.value = errs;
            verifySensibleData();
        } else {
            errors.value = {};
        }
    };

    async function initConfig(el?: HTMLElement | null) {
        if (el) {
            glitchedEl.value = el;
        }
        if (glitchedEl.value) {
            glitch.setGlitchedElement(glitchedEl.value);
            computeConfig(true);

            nextTick(() => {
                selectFirstRangeField();
            });
        }
    }

    function verifySensibleData() {
        if (errors.value["animation.duration"]) {
            glitch.controller?.pause();
        } else {
            glitch.controller?.play();
        }
    }

    function bindGlitch(newBindings: G.Bindings) {
        if (newBindings) {
            bindings.value = newBindings;
        }
    }

    function selectFirstRangeField(range?: G.Field[]) {
        const firstFieldRange = (range || gconfig.value.ranges[0])?.[0];

        if (firstFieldRange) {
            selectField(firstFieldRange);
        }
    }

    function computeConfig(forceRangeCompute?: boolean) {
        if (glitch && glitchedEl?.value) {
            const data = glitch.computeConfig(gconfig.value, forceRangeCompute);

            if (data) {
                bindGlitch(data.bindings);
                EditorUtils.setConfigFromConfig(gconfig.value, data.config);
                EditorUtils.setAllColors(gconfig.value);

                savePreset();
            }
        }
    }

    function updateField(newField: G.Field) {
        if (gconfig.value.ranges[newField.range]) {
            const success = glitch?.computeFields(EditorUtils.getFieldsToUpdate(gconfig.value.ranges, newField));

            if (success) {
                EditorUtils.setAllColors(gconfig.value);
                savePreset();
            }
        }
    }

    function addEmptyRange() {
        gconfig.value.ranges.push([getDefaultField(gconfig.value.ranges.length, 0, 0)]);

        if (!selectedField.value) {
            selectField(gconfig.value.ranges[0][0]);
        }

        computeConfig(true);
    }

    function duplicateRange(rangeIndex: number) {
        const rangeNb = gconfig.value.ranges.length;

        if (rangeNb) {
            EditorUtils.duplicateRange(gconfig.value.ranges, rangeIndex);
            computeConfig(true);
        }
    }

    function reversePositions(index: number) {
        const range = gconfig.value.ranges[index];

        if (range) {
            EditorUtils.reverseRangePositions(range);
            computeConfig(true);
        }
    }

    function reverseColors(rangeIndex: number) {
        const range = gconfig.value.ranges[rangeIndex];

        if (range) {
            EditorUtils.reverseRangeColors(range);
            computeConfig(true);
        }
    }

    function removeField(field: G.Field) {
        if (field.index === selectedField.value?.index && field.range === selectedField.value?.range) {
            closeField();
        }

        EditorUtils.removeField(gconfig.value.ranges, field);
        computeConfig(true);
        selectFirstRangeField(gconfig.value.ranges[field.range]);
    }

    function removeRange(rangeIndex: number) {
        if (rangeIndex === selectedField.value?.range) {
            closeField();
        }

        EditorUtils.removeRange(gconfig.value.ranges, rangeIndex);
        computeConfig(true);
        selectFirstRangeField();
    }

    function selectField(newField: G.Field) {
        if (selectedField.value) {
            EditorUtils.patchFieldErrors(selectedField.value, errors.value);
        }

        selectingField = true;
        closeField();
        nextTick(() => {
            selectedField.value = newField;
        });
    }

    function closeField() {
        selectedField.value = undefined;
    }

    function insertField(rangeIndex: number, offset: number) {
        const hoveredField = EditorUtils.getHoveredField(gconfig.value.ranges[rangeIndex], offset);

        if (hoveredField.range === selectedField.value?.range && hoveredField.index === selectedField.value?.index) {
            EditorUtils.patchFieldErrors(selectedField.value, errors.value);
        }

        const insertedIndex = EditorUtils.addFieldAtOffset(
            gconfig.value.ranges,
            rangeIndex,
            hoveredField.index + 1,
            offset,
        );

        if (insertedIndex !== -1) {
            computeConfig(true);
            selectField(gconfig.value.ranges[rangeIndex][insertedIndex]);
        }
    }

    function presetChanged(preset: Preset) {
        currentPreset.value = preset;
        EditorUtils.setConfigFromPreset(gconfig.value, preset);

        initConfig();
    }

    function savePreset() {
        nextTick(() => {
            if (isCustomPreset.value) {
                onSavePreset();
            }
        });
    }

    function onAnimationUpdate() {
        const configDuration = gconfig.value.animation.duration;

        if (configDuration !== animationDuration) {
            if (glitch.canUseAnimation()) {
                animationDuration = configDuration;
                glitch.replaceAnimationDuration(gconfig.value);

                savePreset();
            } else {
                computeConfig();
            }
        }
    }

    function checkFieldForUpdate() {
        if (selectedField.value) {
            if (selectingField) {
                selectingField = false;
                return;
            }

            updateField(selectedField.value);
        }
    }

    watch(selectedField, checkFieldForUpdate, { deep: true });

    watch(
        gconfig.value.text,
        () => {
            computeConfig();
        },
        { deep: true },
    );

    watch(
        gconfig.value.animation,
        () => {
            onAnimationUpdate();
        },
        { deep: true },
    );

    onBeforeUnmount(() => {
        glitch.destroy();
    });

    return {
        currentPercent,
        errors,
        glitchedEl,
        selectedField,
        currentPreset,
        gconfig,
        bindings,
        glitch,
        hasValidDuration,
        currentFieldKey,
        presetChanged,
        initConfig,
        removeField,
        onRangesEvents,
        onToolboxEvents,
    };
};

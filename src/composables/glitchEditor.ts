import G from "~/lib/glitch/types";
import { type Preset } from "~/lib/toolbox/presets";
import { EditorPresets } from "#components";
import Glitch from "~/lib/glitch";
import * as EditorUtils from "~/lib/editor/utils";

interface EditorPresetsData extends Ref<InstanceType<typeof EditorPresets>> {
    savePreset: () => void;
}

export const useGlitchEditor = () => {
    const currentPercent = ref(0);
    const errors = ref<Partial<G.Errors>>({});
    const glitchedEl = ref<HTMLElement | null>(null);
    const presets = ref<EditorPresetsData>();
    const selectedField = ref<G.Field>();
    const currentPreset = ref<Preset>();
    const gconfig = reactive<G.Config>(getDefaultGlitchConfig());
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
        removeField,
        closeField,
        presetChanged,
    };

    let animationDuration = gconfig.animation.duration;
    const glitch = new Glitch(gconfig);

    gconfig.preventRangesCompute = true;

    gconfig.onValidated = (errs: G.Errors | undefined) => {
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
            selectField(gconfig.ranges[0][0]);
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
        const firstFieldRange = (range || gconfig.ranges[0])?.[0];

        if (firstFieldRange) {
            selectField(firstFieldRange);
        }
    }

    function computeConfig(forceRangeCompute?: boolean) {
        if (glitch && glitchedEl?.value) {
            const data = glitch.computeConfig(gconfig, forceRangeCompute);

            if (data) {
                bindGlitch(data.bindings);
                EditorUtils.setAllColors(gconfig);

                nextTick(() => {
                    savePreset();
                });
            }
        }
    }

    function updateField(newField: G.Field) {
        if (gconfig.ranges[newField.range]) {
            glitch?.computeFields(
                EditorUtils.getFieldsToUpdate(gconfig.ranges, newField),
            );
            EditorUtils.setAllColors(gconfig);
            savePreset();
        }
    }

    function addEmptyRange() {
        gconfig.ranges.push([getDefaultField(gconfig.ranges.length, 0, 0)]);

        if (!selectedField.value) {
            selectField(gconfig.ranges[0][0]);
        }

        computeConfig(true);
    }

    function duplicateRange(rangeIndex: number) {
        const rangeNb = gconfig.ranges.length;

        if (rangeNb) {
            EditorUtils.duplicateRange(gconfig.ranges, rangeIndex);
            computeConfig(true);
        }
    }

    function reversePositions(index: number) {
        const range = gconfig.ranges[index];

        if (range) {
            EditorUtils.reverseRangePositions(range);
            computeConfig(true);
        }
    }

    function reverseColors(rangeIndex: number) {
        const range = gconfig.ranges[rangeIndex];

        if (range) {
            EditorUtils.reverseRangeColors(range);
            computeConfig(true);
        }
    }

    function removeField(field: G.Field) {
        if (
            field.index === selectedField.value?.index &&
            field.range === selectedField.value?.range
        ) {
            closeField();
        }

        EditorUtils.removeField(gconfig.ranges, field);
        computeConfig(true);

        nextTick(() => {
            selectFirstRangeField(gconfig.ranges[field.range]);
        });
    }

    function removeRange(rangeIndex: number) {
        if (rangeIndex === selectedField.value?.range) {
            closeField();
        }

        EditorUtils.removeRange(gconfig.ranges, rangeIndex);
        computeConfig(true);

        nextTick(() => {
            selectFirstRangeField();
        });
    }

    function selectField(newField: G.Field) {
        selectedField.value = newField;
    }

    function closeField() {
        selectedField.value = undefined;
    }

    function insertField(rangeIndex: number, offset: number) {
        const insertedIndex = EditorUtils.addFieldAtOffset(
            gconfig.ranges,
            rangeIndex,
            offset,
        );

        if (insertedIndex !== -1) {
            computeConfig(true);
            selectField(gconfig.ranges[rangeIndex][insertedIndex]);
        }
    }

    function presetChanged(preset: Preset) {
        currentPreset.value = preset;
        EditorUtils.setConfigFromPreset(gconfig, preset);

        nextTick(() => {
            initConfig();
        });
    }

    function savePreset() {
        if (isCustomPreset.value) {
            presets.value?.savePreset();
        }
    }

    const isCustomPreset = computed(() => {
        const preset = currentPreset.value;

        return preset && !preset.builtIn;
    });

    const hasValidDuration = computed(() => {
        return errors.value["animation.duration"] === undefined;
    });

    watch(gconfig.text, () => {
        computeConfig();
    });

    watch(gconfig.animation, () => {
        const configDuration = gconfig.animation.duration;

        if (configDuration !== animationDuration) {
            if (glitch.canUseAnimation()) {
                animationDuration = configDuration;
                glitch.replaceAnimationDuration(gconfig);

                nextTick(() => {
                    savePreset();
                });
            } else {
                computeConfig();
            }
        }
    });

    onBeforeUnmount(() => {
        glitch.destroy();
    });

    return {
        currentPercent,
        errors,
        glitchedEl,
        presets,
        selectedField,
        currentPreset,
        gconfig,
        bindings,
        glitch,
        hasValidDuration,
        presetChanged,
        initConfig,
        onRangesEvents,
        onToolboxEvents,
    };
};

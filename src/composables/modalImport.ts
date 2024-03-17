import { useModal } from "vue-final-modal";
import Import from "~/components/Ui/Modal/Import.vue";
import type Glitch from "~/glitch";
import importKeyframes from "~/utils/Toobox/import";
import type { PresetConfig } from "~/utils/Toobox/presets";

export const useModalImport = (
    glitch: Glitch,
    action: (name: string, config?: PresetConfig) => void,
) => {
    let importKeyframesErrors: Record<string, string> = {};

    function closeImportModal() {
        delete importKeyframesErrors.presetName;
        delete importKeyframesErrors.keyframes;
        importModal.patchOptions({
            attrs: { errors: { ...importKeyframesErrors } },
        });
        importModal.close();
    }

    const importModal = useModal({
        component: Import,
        attrs: {
            errors: importKeyframesErrors,
            onImport(presetName: string, textStyle: string, keyframe: string) {
                const result = importKeyframes(presetName, textStyle, keyframe);

                importKeyframesErrors = result.errors;

                if (Object.keys(importKeyframesErrors).length) {
                    importModal.patchOptions({
                        attrs: { errors: { ...importKeyframesErrors } },
                    });
                } else {
                    const errors = glitch.validateConfig(result.config);
                    const errorsKeys = Object.keys(errors);

                    if (!errorsKeys.length) {
                        action(presetName, {
                            text: result.config.text,
                            animation: result.config.animation,
                            ranges: result.config.ranges,
                        });
                        closeImportModal();
                    } else {
                        if (
                            errorsKeys.findIndex((key) =>
                                key.includes("text"),
                            ) !== -1
                        ) {
                            importKeyframesErrors.textStyle =
                                "errors.import.textStyle";
                        }

                        if (
                            errorsKeys.findIndex((key) =>
                                key.includes("ranges"),
                            ) !== -1
                        ) {
                            importKeyframesErrors.keyframes =
                                "errors.import.keyframes";
                        }
                    }
                }
            },
            onCancel() {
                closeImportModal();
            },
        },
    });

    return {
        importModal,
    };
};

import { useModal } from "vue-final-modal";
import Import from "~/components/Ui/Modal/Import.vue";
import type Glitch from "~/glitch";
import type { GlitchBaseText } from "~/glitch/types";
import type { PresetConfig } from "~/utils/Toobox/presets";

export const useModalImport = (glitch: Glitch, action: (name: string, config?: PresetConfig) => void) => {
    let importKeyframesErrors: Record<string, string> = {};

    function closeImportModal() {
        delete importKeyframesErrors.presetName;
        delete importKeyframesErrors.keyframes;
        importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
        importModal.close();
    }
    
    const importModal = useModal({
        component: Import,
        attrs: {
            errors: importKeyframesErrors,
            onImport(presetName: string, textStyle: string, keyframe: string) {
                importKeyframesErrors = {};

                if (!presetName) {
                    importKeyframesErrors.presetName = "errors.import.presetName";
                    importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                } else if (!keyframe) {
                    importKeyframesErrors.keyframes = "errors.import.keyframes";
                    importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                } else {
                    const config = getDefaultGlitchConfig();
                    const ranges = kfStringToRanges(keyframe);
                    let text: GlitchBaseText | undefined;

                    if (textStyle) {
                        text = textStyleToText(textStyle);

                        if (!text) {
                            importKeyframesErrors.textStyle = "errors.import.textStyle";
                            importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });

                            return;
                        }
                    }

                    if (ranges) {
                        config.ranges = ranges;
                        config.text = text || config.text;
                        const errors = glitch.validateConfig(config);
                        const errorsKeys = Object.keys(errors);

                        if (!errorsKeys.length) {
                            action(presetName, {
                                text: config.text,
                                animation: config.animation,
                                ranges: config.ranges
                            });
                            closeImportModal();
                        } else {
                            if (errorsKeys.findIndex(key => key.includes('text')) !== -1) {
                                importKeyframesErrors.textStyle = "errors.import.textStyle";
                            }

                            if (errorsKeys.findIndex(key => key.includes('ranges')) !== -1) {
                                importKeyframesErrors.keyframes = "errors.import.keyframes";
                            }

                            importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                        }
                    } else {
                        importKeyframesErrors.keyframes = "errors.import.keyframes";
                        importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                    }
                }
            },
            onCancel() {
                closeImportModal();
            }
        }
    });
    
    return {
        importModal
    }
}

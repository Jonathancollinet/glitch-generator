import { useModal } from "vue-final-modal";
import Import from "~/components/Ui/Modal/Import.vue";
import type { PresetConfig } from "~/utils/Toobox/presets";

export const useModalImport = (action: (name: string, config?: PresetConfig) => void) => {
    const importKeyframesErrors: Record<string, string> = {};

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
            onImport(presetName: string, keyframe: string) {
                if (!presetName) {
                    importKeyframesErrors.presetName = "errors.import.presetName";
                    importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                } else if (!keyframe) {
                    importKeyframesErrors.keyframes = "errors.import.keyframes";
                    importModal.patchOptions({ attrs: { errors: { ...importKeyframesErrors } } });
                } else {
                    const config = getDefaultGlitchConfig();
                    const ranges = kfStringToRanges(keyframe);
    
                    if (ranges) {
                        config.ranges = ranges;
                        action(presetName, {
                            text: config.text,
                            animation: config.animation,
                            ranges: config.ranges
                        });
                        closeImportModal();
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

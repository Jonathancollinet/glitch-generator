import { useModal } from "vue-final-modal";
import AddPreset from "~/components/Ui/Modal/AddPreset.vue";

export const useModalAddPreset = (action: (name: string) => void) => {
    const addPresetErrors: Record<string, string> = {};

    function closeAddPresetModal() {
        delete addPresetErrors.name;
        addPresetModal.patchOptions({
            attrs: { errors: { ...addPresetErrors } },
        });
        addPresetModal.close();
    }

    const addPresetModal = useModal({
        component: AddPreset,
        attrs: {
            errors: addPresetErrors,
            onConfirm(name: string) {
                if (name) {
                    action(name);
                    closeAddPresetModal();
                } else {
                    addPresetErrors.name = "errors.addPreset.name";
                    addPresetModal.patchOptions({
                        attrs: { errors: { ...addPresetErrors } },
                    });
                }
            },
            onCancel() {
                closeAddPresetModal();
            },
        },
    });

    return {
        addPresetModal,
    };
};

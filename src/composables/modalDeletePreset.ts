import { useModal } from "vue-final-modal";
import DeletePreset from "~/components/Ui/Modal/DeletePreset.vue";

export const useModalDeletePreset = (action: () => void) => {
    const deletePresetModal = useModal({
        component: DeletePreset,
        attrs: {
            onConfirm() {
                action();
                deletePresetModal.close();
            },
            onCancel() {
                deletePresetModal.close();
            }
        }
    });

    return {
        deletePresetModal
    }
}

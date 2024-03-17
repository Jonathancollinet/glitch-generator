import { useModal } from "vue-final-modal";
import Export from "~/components/Ui/Modal/Export.vue";
import type Glitch from "~/glitch";

export const useModalExport = (glitch: Glitch) => {
    const exportModal = useModal({
        component: Export,
        attrs: {
            glitch,
            onCancel() {
                exportModal.close();
            },
        },
    });

    return {
        exportModal,
    };
};

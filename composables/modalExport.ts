import { useModal } from "vue-final-modal";
import Export from "~/components/Ui/Modal/Export.vue";
import type Glitch from "~/glitch";
import type { GlitchConfig } from "~/glitch/types";

export const useModalExport = (glitch: Glitch, config: GlitchConfig) => {
    const exportModal = useModal({
        component: Export,
        attrs: {
            glitch,
            config,
            onCancel() {
                exportModal.close();
            }
        }
    });

    return {
        exportModal
    }
}

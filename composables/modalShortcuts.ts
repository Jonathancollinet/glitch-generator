import { useModal } from "vue-final-modal";
import Shortcuts from "~/components/Ui/Modal/Shortcuts.vue";

export const useModalShortcuts = () => {
    const shortcutsModal = useModal({
        component: Shortcuts,
        attrs: {
            onCancel() {
                shortcutsModal.close();
            }
        }
    });
    
    return {
        shortcutsModal
    }
}

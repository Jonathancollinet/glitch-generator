import { useModal } from "vue-final-modal";
import ImportRules from "~/components/Ui/Modal/ImportRules.vue";

export const useModalImportRules = () => {
    const importRulesModal = useModal({
        component: ImportRules,
        attrs: {
            onCancel() {
                importRulesModal.close();
            },
        },
    });

    return {
        importRulesModal,
    };
};

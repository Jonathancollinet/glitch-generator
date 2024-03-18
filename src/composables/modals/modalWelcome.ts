import { useModal } from "vue-final-modal";
import Welcome from "~/components/Ui/Modal/Welcome.vue";

export const useModalWelcome = (
    cancelAction: () => void,
    startAction: () => void,
) => {
    const welcomeModal = useModal({
        component: Welcome,
        attrs: {
            onClose() {
                welcomeModal.close();
            },
            onCancel() {
                cancelAction();
                welcomeModal.close();
            },
            onStart() {
                startAction();
                welcomeModal.close();
            },
        },
    });

    return {
        welcomeModal,
    };
};

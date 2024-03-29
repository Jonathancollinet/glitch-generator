<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { VueFinalModal } from "vue-final-modal";
import { ContentVariants, ModalVariants } from "~/ui/Modal";

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes["class"];
        title?: string;
        contentClass?: string;
        overlayTransition?: string;
        contentTransition?: string;
        clickToClose?: boolean;
        escToClose?: boolean;
    }>(),
    {
        clickToClose: true,
        escToClose: true,
        class: "",
        variant: undefined,
        size: undefined,
        title: "",
        contentClass: "",
        overlayTransition: undefined,
        contentTransition: undefined,
    },
);

const emit = defineEmits<{
    closed: [];
}>();

function onClose() {
    emit("closed");
}
</script>

<template>
    <VueFinalModal
        :class="cn(ModalVariants(), props.class)"
        :content-class="cn(ContentVariants(), props.contentClass)"
        :click-to-close="clickToClose"
        :esc-to-close="escToClose"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        @closed="onClose"
    >
        <div v-if="title" class="flex items-center">
            <UiHeading class="mt-0" variant="h2">{{ $t(title) }}</UiHeading>
        </div>
        <div>
            <slot />
        </div>
        <div class="mt-4 flex items-center justify-end space-x-2">
            <slot name="footer" />
        </div>
    </VueFinalModal>
</template>

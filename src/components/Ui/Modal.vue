<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { ContentVariants, ModalVariants, type ModalVariantsProps } from '~/componentsVariants/Ui/Modal';

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class'],
    variant?: ModalVariantsProps['variant'],
    size?: ModalVariantsProps['size'],
    title?: string,
    contentClass?: string
    overlayTransition?: string
    contentTransition?: string,
    clickToClose?: boolean,
    escToClose?: boolean
}>(), {
    clickToClose: true,
    escToClose: true
});

const emit = defineEmits<{
    closed: []
}>();

function onClose() {
    emit('closed');
}
</script>

<template>
    <VueFinalModal :class="cn(ModalVariants({ variant, size }), props.class ?? '')"
        :content-class="cn(ContentVariants(), props.contentClass ?? '')" :clickToClose="clickToClose"
        :escToClose="escToClose" overlay-transition="vfm-fade" content-transition="vfm-fade" @closed="onClose">
        <div class="flex items-center" v-if="title">
            <UiHeading class="mt-0" variant="h2">{{ $t(title) }}</UiHeading>
        </div>
        <div>
            <slot />
        </div>
        <div class="flex items-center justify-end mt-4 space-x-2">
            <slot name="footer" />
        </div>
    </VueFinalModal>
</template>
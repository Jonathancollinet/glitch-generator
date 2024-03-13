<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import { ModalVariants, type ModalVariantsProps } from '~/componentsVariants/Ui/Modal';

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

const finalContentClass = computed(() => {
    return [
        'max-w-xl p-6 bg-primary-50',
        'border-2 border-neutral-700',
        'dark:bg-primary-950 dark:border-neutral-300'
    ];
});
</script>

<template>
    <VueFinalModal :class="cn(ModalVariants({ variant, size }), props.class ?? '')"
        :content-class="cn(finalContentClass, props.contentClass ?? '')" :clickToClose="clickToClose"
        :escToClose="escToClose" overlay-transition="vfm-fade" content-transition="vfm-fade" @closed="onClose">
        <div class="flex items-center" v-if="title">
            <UiHeading class="mt-0" variant="h3">{{ $t(title) }}</UiHeading>
        </div>
        <div>
            <slot />
        </div>
        <div class="flex items-center justify-end mt-4 space-x-2">
            <slot name="footer" />
        </div>
    </VueFinalModal>
</template>

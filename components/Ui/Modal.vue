<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
    contentClass?: string
    overlayTransition?: string
    contentTransition?: string
}>();

const emit = defineEmits<{
    closed: []
}>();

function onClose() {
    emit('closed');
}

const finalContentClass = computed(() => {
    return cn([
        'max-w-xl p-6 bg-primary-50',
        'dark:bg-primary-950 border dark:border-neutral-700'
    ], props.contentClass)
});
</script>

<template>
    <VueFinalModal class="flex justify-center items-center"
        :content-class="finalContentClass"
        overlay-transition="vfm-fade" content-transition="vfm-fade" @closed="onClose">
        <slot />
        <div class="flex items-center justify-end mt-4 space-x-2">
            <slot name="footer" />
        </div>
    </VueFinalModal>
</template>

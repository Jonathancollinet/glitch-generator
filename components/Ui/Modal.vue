<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
    contentClass?: string
    overlayTransition?: string
    contentTransition?: string
}>();

const finalContentClass = computed(() => {
    return cn([
        'max-w-xl mx-4 p-4 bg-primary-50 rounded-lg space-y-2',
        'dark:bg-primary-950 border dark:border-neutral-700'
    ], props.contentClass)
});
</script>

<template>
    <VueFinalModal class="flex justify-center items-center"
        :content-class="finalContentClass"
        overlay-transition="vfm-fade" content-transition="vfm-fade">
        <slot />
    </VueFinalModal>
</template>

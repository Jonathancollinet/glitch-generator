<script lang="ts" setup>
defineProps<{
    currentPercent: number
}>()

const emit = defineEmits<{
    selectAnimationAt: [percent: number]
}>()

const moveContainer = ref<HTMLElement | null>(null);
const currentWidth = ref(0);
const displayTitle = ref(false);

// todo: handle touch events

function selectAnimationAt(e: MouseEvent) {
    if (moveContainer.value) {
        const rect = moveContainer.value.getBoundingClientRect();
        const x = e.clientX - rect.left;

        // on some browsers the clientX can be negative on drag mouseup
        if (x >= 0) {
            let percent = (x / rect.width) * 100;

            if (percent < 0) {
                percent = 0;
            }
            if (percent > 100) {
                percent = 100;
            }
            if (percent >= 0 && percent <= 100) {
                emit('selectAnimationAt', percent);
            }
        }
    }
}

function hideGhost(e: DragEvent) {
    e.dataTransfer?.setDragImage(new Image(), 0, 0);
}

function adaptCurrentWidth() {
    if (moveContainer.value) {
        currentWidth.value = moveContainer.value.clientWidth;
    }
}

function setTitle() {
    displayTitle.value = true;
}

function removeTitle() {
    displayTitle.value = false;
}

onMounted(() => {
    if (moveContainer.value) {
        currentWidth.value = moveContainer.value.clientWidth;
    }

    if (process.client) {
        window.addEventListener('resize', adaptCurrentWidth);
    }
})

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('resize', adaptCurrentWidth);
    }
})
</script>

<template>
    <div class="mb-2 px-5 w-full">
        <div class="text-center" v-if="displayTitle">
            {{ Math.round((currentPercent + Number.EPSILON) * 100) / 100 }}%
        </div>
        <div class="w-full py-1 px-2 overflow-hidden cursor-pointer group" @mousedown="selectAnimationAt" @mouseenter="setTitle" @mouseleave="removeTitle">
            <div ref="moveContainer" class="relative w-full h-1 bg-neutral-400 group-hover:bg-blue-400">
                <div class="absolute -top-1 h-3 w-3 z-10"
                    @mousedown.stop
                    @dragstart.stop="hideGhost"
                    @drag.stop="selectAnimationAt"
                    @mouseup.stop
                    draggable="true"
                    :style="{ transform: `translateX(${currentWidth * (currentPercent / 100)}px)` }">
                    <div class="w-3 h-3 bg-blue-800 rounded-full -translate-x-1/2"></div>
                </div>
            </div>
        </div>
    </div>
</template>

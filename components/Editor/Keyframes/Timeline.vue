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

function selectAnimationAt(e: MouseEvent | TouchEvent) {
    if (moveContainer.value) {
        const rect = moveContainer.value.getBoundingClientRect();
        let x, takeValue;

        setTitle();

        if (e instanceof MouseEvent) {
            x = e.clientX - rect.left;
            takeValue = !!(e.screenX && e.screenY);
        } else {
            x = e.touches[0].clientX - rect.left;
            takeValue = !!(e.touches[0].screenX && e.touches[0].screenY);
        }

        if (takeValue) {
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

function hideGhost(e: DragEvent | TouchEvent) {
    if (e instanceof DragEvent) {
        e.dataTransfer?.setDragImage(new Image(), 0, 0);
    }
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
    <div class="mb-2 px-5 w-full select-none">
        <Transition name="fade" mode="out-in">
            <div class="text-center" v-if="displayTitle">
                {{ Math.round((currentPercent + Number.EPSILON) * 100) / 100 }}%
            </div>
        </Transition>
        <div class="relative w-full py-1 px-4 overflow-hidden cursor-pointer group"
            @mousedown="selectAnimationAt" @touchstart="selectAnimationAt" @touchmove="selectAnimationAt"
            @touchend="removeTitle" @mouseenter="setTitle" @mouseleave="removeTitle">
            <div ref="moveContainer"
                class="relative flex items-center w-full h-2 transition-[background-color] bg-primary-200 group-hover:bg-primary-300 dark:bg-primary-400">
                <div class="absolute h-4 w-4 z-10" @mousedown.stop @dragstart.stop="hideGhost"
                    @touchstart.stop="hideGhost" @drag.stop="selectAnimationAt" @mouseup.stop draggable="true"
                    :style="{ transform: `translateX(${currentWidth * (currentPercent / 100)}px)` }">
                    <div class="w-full h-full bg-primary-600 rounded-full -translate-x-1/2 hover:cursor-grab dark:bg-primary-50"></div>
                </div>
            </div>
        </div>
    </div>
</template>

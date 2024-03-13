<script lang="ts" setup>
import { debounce } from 'vue-debounce';

const props = defineProps<{
    currentPercent: number,
    precision: number
}>()

const emit = defineEmits<{
    selectAnimationAt: [percent: number]
}>()

const moveContainer = ref<HTMLElement | null>(null);
const currentWidth = ref(0);
const displayTitle = ref(false);

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
            let percent = Math.round((x / rect.width) * 100 * props.precision) / props.precision;

            percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

            if (props.currentPercent !== percent) {
                emit('selectAnimationAt', percent);
            }
        }
    }
}

const updateTiming = debounce((e: MouseEvent | TouchEvent) => selectAnimationAt(e), 1);

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
    <div class="mb-2 px-5 w-full max-w-[600px] select-none">
        <Transition name="fade" mode="out-in">
            <div class="text-center mb-2 font-bold" v-if="displayTitle">
                {{ Math.round((currentPercent + Number.EPSILON) * 100) / 100 }}%
            </div>
        </Transition>
        <div class="relative w-full py-1 px-4 overflow-hidden cursor-pointer group"
            @mousedown="updateTiming" @touchstart="updateTiming" @touchmove="updateTiming"
            @touchend="removeTitle" @mouseenter="setTitle" @mouseleave="removeTitle">
            <div ref="moveContainer"
                class="relative flex items-center w-full h-2 transition-[background-color] bg-primary-200 group-hover:bg-primary-300 dark:bg-primary-400">
                <div class="absolute h-4 w-4 z-10" @mousedown.stop @dragstart.stop="hideGhost"
                    @touchstart.stop="hideGhost" @drag.stop="updateTiming" @mouseup.stop draggable="true"
                    :style="{ transform: `translateX(${currentWidth * (currentPercent / 100)}px)` }">
                    <div class="w-full h-full bg-primary-600 -translate-x-1/2 hover:cursor-grab active:cursor-grabbing dark:bg-primary-50"></div>
                </div>
            </div>
        </div>
    </div>
</template>

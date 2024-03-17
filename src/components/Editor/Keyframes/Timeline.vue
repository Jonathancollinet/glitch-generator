<script lang="ts" setup>
import { debounce } from "vue-debounce";
import { RangeVariants } from "~/componentsVariants/Ui/Range";
import { TimelineVariants } from "~/componentsVariants/Ui/Timeline";

defineProps<{
    currentPercent: number;
    precision: number;
}>();

const emit = defineEmits<{
    selectAnimationAt: [percent: number];
}>();

const moveContainer = ref<HTMLElement | null>(null);
const currentWidth = ref(0);
const displayTitle = ref(false);

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

function changePercent(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    emit("selectAnimationAt", value);
}

const updateTiming = debounce((e: Event) => changePercent(e), 1);

onMounted(() => {
    if (moveContainer.value) {
        currentWidth.value = moveContainer.value.clientWidth;
    }

    if (isClient()) {
        window.addEventListener("resize", adaptCurrentWidth);
    }
});

onUnmounted(() => {
    if (isClient()) {
        window.removeEventListener("resize", adaptCurrentWidth);
    }
});
</script>

<template>
    <div class="mb-2 w-full max-w-[600px] select-none px-5">
        <Transition name="fade" mode="out-in">
            <div v-if="displayTitle" class="mb-2 text-center font-bold">
                {{ Math.round((currentPercent + Number.EPSILON) * 100) / 100 }}%
            </div>
        </Transition>
        <div
            class="relative w-full px-4"
            @mouseenter="setTitle"
            @mouseleave="removeTitle"
        >
            <input
                :class="cn('w-full', RangeVariants(), TimelineVariants())"
                type="range"
                step="0.001"
                min="0"
                max="100"
                :value="currentPercent"
                @input="updateTiming"
            />
        </div>
    </div>
</template>

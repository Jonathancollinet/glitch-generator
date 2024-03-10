<script lang="ts" setup>
import { Icons } from '~/types/enums';
import { isTourDone, setTourDone, tourSteps } from '~/utils/Editor/tour';

const tours: any = inject('tours')
const mounted = ref(false);

function initTour() {
    tours['tutorial']?.start();
}

const tourCallbacks = {
    onFinish: setTourDone,
    onSkip: setTourDone,
    onStop: setTourDone,
}

onMounted(() => {
    mounted.value = true;
    nextTick(() => {
        if (!isTourDone()) {
            initTour();
        }
    })
})
</script>

<template>
    <UiButton v-tooltip.right="$t('pages.editor.launchTour')" class="ml-4" variant="icon" size="icon" @click="initTour">
        <UiIcon :icon="Icons.Help" @click="initTour" />
    </UiButton>
    <template v-if="mounted">
        <v-tour name="tutorial" :steps="tourSteps" :callbacks="tourCallbacks"
            :options="{ useKeyboardNavigation: false }" />
    </template>

</template>
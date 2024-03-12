<script lang="ts" setup>
import { Icons } from '~/types/enums';
import { isTourDone, setTourDone, tourSteps } from '~/utils/Editor/tour';

const tours: any = inject('tours')
const mounted = ref(false);

const { welcomeModal } = useModalWelcome(setTourDone, initTour);

const tourCallbacks = {
    onFinish: setTourDone,
    onSkip: setTourDone,
    onStop: setTourDone,
}

function initTour() {
    tours['tutorial']?.start();
}

onMounted(() => {
    mounted.value = true;
    nextTick(() => {
        if (!isTourDone()) {
            welcomeModal.open();            
        }
    })
})
</script>

<template>
    <UiButton v-tooltip="$t('pages.editor.launchTour')" class="ml-4" variant="icon" size="icon" @click="initTour">
        <UiIcon :icon="Icons.Help" @click="initTour" />
    </UiButton>
    <template v-if="mounted">
        <v-tour name="tutorial" :steps="tourSteps" :callbacks="tourCallbacks"
            :options="{ useKeyboardNavigation: false }" />
    </template>

</template>
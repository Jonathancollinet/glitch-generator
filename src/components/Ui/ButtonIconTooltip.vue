<script lang="ts" setup>
import { Icons } from '~/types/enums';

defineProps<{
    icon?: Icons
}>()

const emit = defineEmits<{
    click: [],
    clickOutside: []
}>()

function onClick() {
    emit('click');
}
</script>

<template>
    <div>
        <UiButton variant="icon" size="icon" @click="onClick">
            <UiIcon :icon="icon || Icons.Dots" />
        </UiButton>
        <Transition name="fade" mode="out-in">
            <slot />
        </Transition>
    </div>
</template>
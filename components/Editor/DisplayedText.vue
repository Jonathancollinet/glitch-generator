<script setup lang="ts">
import contenteditable from 'vue-contenteditable'

const props = defineProps<{
    config: GlitchConfig,
}>();

const reRender = ref(0);
const message = ref("😹");

watch(props.config, (newValue) => {
    reRender.value++;

    console.log("props.config updated -> ", newValue)
    if (reRender.value > 1000) {
        reRender.value = 0;
    }
})

</script>

<template>
    <div class="w-full h-[100vw] bg-blue-100 min-h-72 max-h-[80vh]">
        <div class="flex h-full items-center justify-center">
            <contenteditable tag="div" v-model="message" v-glitch="config" :key="reRender" />
        </div>
    </div>
</template>

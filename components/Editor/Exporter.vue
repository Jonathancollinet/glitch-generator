<script setup lang="ts">
const props = defineProps<{
    config: GlitchConfig
}>();

const localConfig = reactive(props.config);
</script>

<template>
    <div class="mt-4">
        <div>Exporter</div>
    </div>
</template>

<style scoped>

</style>
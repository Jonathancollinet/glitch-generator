<script setup lang="ts">
import type { _GlitchConfig } from '~/plugins/glitch/types';

const props = defineProps<{
    config: _GlitchConfig
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
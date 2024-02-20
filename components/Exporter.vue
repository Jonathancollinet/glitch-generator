<script setup lang="ts">
import type { Config } from '~/types/config';

const props = defineProps<{
    config: Config
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
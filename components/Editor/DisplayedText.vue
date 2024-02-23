<script setup lang="ts">
import type { Directive } from 'vue';
import { type GlitchConfig } from '~/glitch/types';

defineProps<{
    config: GlitchConfig,
}>();

</script>

<template>
    <div class="w-full h-[100vw] bg-blue-100 min-h-72 max-h-[80vh]">
        <div class="flex h-full items-center justify-center select-none">
            <EditorGlitchedText class="text-center" :config="config" />
        </div>
    </div>
</template>

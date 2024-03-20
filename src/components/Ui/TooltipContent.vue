<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { TooltipContentVariants } from "~/ui/TooltipContent";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div :class="cn(TooltipContentVariants(), props.class ?? '')">
        <slot />
    </div>
</template>

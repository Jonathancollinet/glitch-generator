<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { RangeVariants } from "~/ui/Range";
import type { UpdateFn } from "~/lib/toolbox/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    min: string | number;
    max: string | number;
    step?: string | number;
    modelValue: string | number;
    onUpdate: UpdateFn;
}>();
</script>

<template>
    <input
        :class="cn(RangeVariants(), props.class ?? '')"
        type="range"
        :step="step"
        :min="min"
        :max="max"
        :value="modelValue"
        @input="onUpdate"
    />
</template>

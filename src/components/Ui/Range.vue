<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import {
    RangeVariants,
    type RangeVariantsProps,
} from "~/componentsVariants/Ui/Range";
import type { UpdateFn } from "~/utils/Toobox/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    variant?: RangeVariantsProps["variant"];
    min: string | number;
    max: string | number;
    step?: string | number;
    modelValue: string | number;
    onUpdate: UpdateFn;
}>();
</script>

<template>
    <input
        :class="cn(RangeVariants({ variant }), props.class ?? '')"
        type="range"
        :step="step"
        :min="min"
        :max="max"
        :value="modelValue"
        @input="onUpdate"
    />
</template>

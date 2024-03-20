<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { SelectVariants } from "~/ui/Select";

type Option = string | number | { [key: string]: any };

const props = defineProps<{
    class?: HTMLAttributes["class"];
    options: Array<Option>;
    labelKey?: string;
    valueKey?: string;
}>();

const emit = defineEmits<{
    change: [e: Event];
}>();

const value = defineModel<Option>({ required: true });

function onChange(e: Event) {
    emit("change", e);
}

const optionLabel = (option: Option) => {
    if (props.labelKey && typeof option === "object") {
        return option[props.labelKey];
    }

    return option;
};

const optionValue = (option: Option) => {
    if (props.valueKey && typeof option === "object") {
        return option[props.valueKey];
    }

    return option;
};
</script>

<template>
    <select v-model="value" :class="cn(SelectVariants(), props.class ?? '')" @change="onChange">
        <option
            v-for="(option, index) in props.options"
            :key="index"
            class="text-neutral-800"
            :value="optionValue(option)"
        >
            {{ optionLabel(option) }}
        </option>
    </select>
</template>

<script lang="ts" setup>
import { type InputVariantsProps, InputVariants } from "~/ui/Input";
import type { HTMLAttributes } from "vue";
import type { UpdateFn } from "~/lib/toolbox/utils";

type acceptedTypes = "textarea" | "text" | "password" | "email" | "number" | "tel" | "search" | "url" | "color";

const props = withDefaults(
    defineProps<{
        placeholder?: string;
        variant?: InputVariantsProps["variant"];
        alignment?: InputVariantsProps["alignment"];
        size?: InputVariantsProps["size"];
        type?: acceptedTypes;
        name: string;
        readonly?: boolean;
        class?: HTMLAttributes["class"];
        onUpdate?: UpdateFn;
    }>(),
    {
        type: "text",
        debounce: false,
        readonly: false,
        class: "",
        placeholder: "",
        variant: undefined,
        alignment: undefined,
        size: undefined,
        onUpdate: undefined,
    },
);

const modelValue = defineModel<string | number>();

function updateModelValue(e: Event) {
    if (props.onUpdate) {
        props.onUpdate(e);
    } else {
        modelValue.value = (e.target as HTMLInputElement)?.value;
    }
}

const isColor = computed(() => props.type === "color");
const isTextArea = computed(() => props.type === "textarea");
</script>

<template>
    <textarea
        v-if="isTextArea"
        :id="name"
        :readonly="readonly"
        :placeholder="placeholder"
        :class="cn('resize', isColor ? 'cursor-pointer' : '', InputVariants({ variant, alignment, size }), props.class)"
        autocomplete="off"
        :type="type"
        :name="name"
        :value="modelValue"
        @input="updateModelValue"
    />
    <input
        v-else
        :id="name"
        :readonly="readonly"
        :placeholder="placeholder"
        :class="cn(isColor ? 'cursor-pointer' : '', InputVariants({ variant, alignment, size }), props.class)"
        autocomplete="off"
        :type="type"
        :name="name"
        :value="modelValue"
        @input="updateModelValue"
    />
</template>

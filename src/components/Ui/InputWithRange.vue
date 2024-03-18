<script lang="ts" setup>
import type { UpdateFn } from "~/lib/toolbox/utils";

withDefaults(
    defineProps<{
        label: string;
        value?: string | number;
        name: string;
        min?: string | number;
        max?: string | number;
        error?: string;
        update: UpdateFn;
    }>(),
    {
        value: 0,
        min: "-256",
        max: "256",
        error: undefined,
    },
);
</script>

<template>
    <UiFormGroup
        inline
        :label="label"
        class="ml-0 w-full"
        :error="error"
        :name="name"
    >
        <UiInput
            class="h-6 w-[40px] px-0"
            alignment="center"
            type="tel"
            :name="name"
            :model-value="value"
            :on-update="update"
        />
        <UiRange
            class="ml-2 w-[calc(75%-40px)] md:max-w-[100px] lg:w-[calc(90%-40px)] lg:max-w-full"
            :min="min"
            :max="max"
            :model-value="value"
            :on-update="update"
        />
    </UiFormGroup>
</template>

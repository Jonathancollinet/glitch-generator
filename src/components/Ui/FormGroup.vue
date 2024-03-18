<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { FormGroupVariants, type FormGroupVariantsProps } from "~/ui/FormGroup";

const props = defineProps<{
    variant?: FormGroupVariantsProps["variant"];
    size?: FormGroupVariantsProps["size"];
    alignment?: FormGroupVariantsProps["alignment"];
    class?: HTMLAttributes["class"];
    label?: string;
    name?: string;
    error?: string;
    inline?: boolean;
}>();
</script>

<template>
    <div
        :class="
            cn(
                'FormGroup group/fg',
                FormGroupVariants({ variant, alignment, size }),
                props.class ?? '',
            )
        "
    >
        <slot name="before" />
        <template v-if="inline">
            <div class="flex items-center justify-between">
                <UiText
                    v-if="label"
                    as="label"
                    class="min-w-[40px] select-none whitespace-nowrap text-left"
                    :for="name"
                    >{{ $t(label) }}</UiText
                >
                <div class="flex w-full items-center justify-end">
                    <slot />
                </div>
            </div>
            <UiText
                v-if="error"
                as="div"
                data-color="danger"
                data-size="xs"
                class="mt-1 italic"
                >{{ $t(error) }}</UiText
            >
        </template>
        <template v-else>
            <UiText
                v-if="label"
                as="label"
                class="select-none pl-1 first:pl-0"
                :for="name"
                >{{ $t(label) }}</UiText
            >
            <slot />
            <UiText
                v-if="error"
                as="div"
                data-color="danger"
                data-size="xs"
                class="mt-1 italic"
                >{{ $t(error) }}</UiText
            >
        </template>
    </div>
</template>

<style scoped>
.FormGroup {
    font-family: "Signika Negative", sans-serif;
}
</style>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { CheckVariants, CheckboxVariants } from "~/ui/Checkbox";
import { Icons } from "~/types/enums";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    label: string;
    error?: string;
    name: string;
    checked: boolean;
    updateFn: ((event: Event) => void) | undefined;
}>();

const checkbox = ref<HTMLInputElement | null>(null);
</script>

<template>
    <UiFormGroup :class="cn(CheckboxVariants(), props.class ?? '')" :label="label" :error="error" :name="name">
        <template #before>
            <div v-if="checkbox" class="h-4 w-4 border bg-neutral-50" @click="checkbox.click()">
                <div v-if="checked" :class="cn(CheckVariants())">
                    <UiIcon class="h-full w-full stroke-neutral-50 stroke-[4px]" :icon="Icons.Checked" />
                </div>
            </div>
            <input
                :id="name"
                ref="checkbox"
                class="hidden"
                type="checkbox"
                :name="name"
                :checked="checked"
                @change="updateFn"
            />
        </template>
    </UiFormGroup>
</template>

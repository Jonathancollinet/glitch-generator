<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { CheckboxVariants, type CheckboxVariantsProps } from '~/componentsVariants/Ui/Checkbox';
import { Icons } from '~/types/enums';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    variant?: CheckboxVariantsProps['variant'],
    size?: CheckboxVariantsProps['size'],
    label: string,
    error: string | undefined,
    name: string,
    checked: boolean,
    updateFn: ((event: Event) => void) | undefined,
}>();

const checkbox = ref<HTMLInputElement | null>(null);
</script>

<template>
    <UiFormGroup :class="cn(CheckboxVariants({ variant, size }), props.class ?? '')" :label="label" :error="error" :name="name">
        <template #before>
            <div v-if="checkbox" class="w-3 h-3 border bg-neutral-50" @click="checkbox.click()">
                <div v-if="checked" class="h-full w-full bg-primary-600 group-hover/fg:bg-primary-500">
                    <UiIcon class="h-full w-full stroke-neutral-50 stroke-[4px]" :icon="Icons.Checked" />
                </div>
            </div>
            <input ref="checkbox" class="hidden" type="checkbox" :id="name" :name="name" :checked="checked" @change="updateFn">
        </template>
    </UiFormGroup>
</template>
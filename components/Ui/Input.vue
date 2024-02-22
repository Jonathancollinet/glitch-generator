<script lang="ts" setup>
import vueDebounce from 'vue-debounce';

const vDebounce = vueDebounce({});

type acceptedTypes = 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';

const props = withDefaults(defineProps<{
    type?: acceptedTypes,
    name: string,
    debounce?: boolean,
    debounceTime?: number,
    debounceFn?: (value: any) => void,
}>(), {
    type: 'text',
    debounce: false,
});

const modelValue = defineModel();

const localeDebounceTime = computed(() => {
    if (props.debounce) {
        return props.debounceTime || 300;
    }
});

function updateModelValue(value: string) {
    if (props.debounceFn) {
        props.debounceFn(value);
    } else {
        modelValue.value = value;
    }
}
</script>

<template>
    <input v-if="debounce" :type="type" :id="name" :name="name" :value="modelValue" v-debounce:[debounceTime]="updateModelValue">
    <input v-else :type="type" :id="name" :name="name" v-model="modelValue">
</template>

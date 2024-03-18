<script lang="ts" setup>
defineProps<{
    errors: Record<string, string>;
}>();

const emit = defineEmits<{
    cancel: [];
    import: [presetName: string, textStyle: string, keyframes: string];
}>();

const textStyle = ref("");
const importedCode = ref("");
const presetName = ref("");

function onCancel() {
    emit("cancel");
}

function onImport() {
    emit("import", presetName.value, textStyle.value, importedCode.value);
}
</script>

<template>
    <UiModal content-class="w-auto" title="modals.import.title" @closed="onCancel">
        <UiText>
            {{ $t("modals.import.description") }}
            <OpenImportRules />
        </UiText>

        <div class="w-full">
            <UiFormGroup label="modals.import.presetName" name="presetName" :error="errors.presetName">
                <UiInput v-model="presetName" name="presetName" class="w-full" />
            </UiFormGroup>
            <UiFormGroup class="ml-0" label="modals.import.textStyle" name="textStyle" :error="errors.textStyle">
                <UiInput
                    v-model="textStyle"
                    placeholder=".className { ..."
                    type="textarea"
                    name="textStyle"
                    class="h-32 w-full"
                />
            </UiFormGroup>
            <UiFormGroup class="ml-0" label="modals.import.code" name="code" :error="errors.keyframes">
                <UiInput
                    v-model="importedCode"
                    placeholder="@keyframes animationName { ..."
                    type="textarea"
                    name="code"
                    class="h-56 w-full"
                />
            </UiFormGroup>
        </div>
        <template #footer>
            <UiButton variant="link" size="sm" @click="onCancel">{{ $t("modals.confirm.cancel") }}</UiButton>
            <UiButton @click="onImport">{{ $t("modals.import.action") }}</UiButton>
        </template>
    </UiModal>
</template>

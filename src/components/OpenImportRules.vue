<script lang="ts" setup>
const { importRulesModal } = useModalImportRules();
</script>

<template>
    <UiButton
        class="font-bold"
        color="danger"
        variant="link"
        size="link"
        @click="importRulesModal.open"
    >
        {{ $t("modals.import.rules.action") }}
    </UiButton>
</template>

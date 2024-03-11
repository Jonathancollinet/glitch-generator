<script lang="ts" setup>
const { importRulesModal } = useModalImportRules();
</script>

<template>
    <div>
        <UiHeading variant="h3">{{ $t('pages.help.import.title') }}</UiHeading>
        <UiText>{{ $t('pages.help.import.what') }}</UiText>
        <UiText>{{ $t('pages.help.import.why') }}</UiText>
        <UiText>{{ $t('pages.help.import.css') }}</UiText>
        <UiText>{{ $t('pages.help.import.text') }}</UiText>
        <UiButton class="font-bold text-red-500 hover:text-red-400" variant="link" size="link"
            @click="importRulesModal.open">
            {{ $t('modals.import.rules.action') }}
        </UiButton>

    </div>
</template>
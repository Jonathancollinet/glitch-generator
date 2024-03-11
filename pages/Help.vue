<script lang="ts" setup>
const activeHelp = ref('tool');

</script>

<template>
    <div class="max-w-[800px] mx-auto">
        <UiHeading>{{ $t('pages.help.title') }}</UiHeading>
        <HelpSummary v-model="activeHelp" />

        <div class="space-y-8">
            <HelpTool v-if="activeHelp === 'tool'" />
            <HelpInput v-if="activeHelp === 'input'" />
            <HelpKeyframes v-if="activeHelp === 'keyframes'" />
            <HelpExport v-if="activeHelp === 'export'" />
            <HelpImport v-if="activeHelp === 'import'" />
            <HelpPresets v-if="activeHelp === 'presets'" />
        </div>
    </div>
</template>
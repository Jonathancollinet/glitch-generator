<template>
  <div>
    <UiHeading variant="h2">{{ $t('pages.help.export.title') }}</UiHeading>
    <UiText>{{ $t('pages.help.export.what') }}</UiText>
    <UiText>{{ $t('pages.help.export.kind') }}</UiText>
    <div class="space-y-1 pl-4">
        <UiText as="div">1. {{ $t('pages.help.export.css') }}</UiText>
        <UiText as="div">2. {{ $t('pages.help.export.js') }}</UiText>
        <UiText as="div">3. {{ $t('pages.help.export.config') }}</UiText>
    </div>
    <UiHeading variant="h3">{{ $t('pages.help.export.asConfig') }}</UiHeading>
    <UiText>{{ $t('pages.help.export.configUsage') }}</UiText>
  </div>
</template>
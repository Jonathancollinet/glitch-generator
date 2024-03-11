<template>
    <div>
        <UiHeading variant="h3">{{ $t('pages.help.tool.title') }}</UiHeading>
        <UiText>{{ $t('pages.help.tool.what') }}</UiText>
        <UiText>{{ $t('pages.help.tool.generate') }} <UiLink
                href="https://developer.mozilla.org/en-US/docs/Web/API/Animation/Animation" target="_blank">{{
            $t('pages.help.tool.animationAPI') }}</UiLink> {{ $t('pages.help.tool.ifSupported') }}
        </UiText>
    </div>
</template>
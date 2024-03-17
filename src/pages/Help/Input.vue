<template>
    <div>
        <UiHeading variant="h2">{{ $t("pages.help.input.title") }}</UiHeading>
        <UiText>{{ $t("pages.help.input.what") }}</UiText>
        <div class="space-y-1 pl-4">
            <UiText as="div">1. {{ $t("pages.help.input.text") }}</UiText>
            <UiText as="div"
                >2. {{ $t("pages.help.input.textAnimation") }}</UiText
            >
            <UiText as="div">3. {{ $t("pages.help.input.animation") }}</UiText>
        </div>
    </div>
</template>

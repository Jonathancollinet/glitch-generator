<script>
import { version } from '~/utils/constants';
</script>
<template>
    <div class="pt-12 pb-6 flex justify-center">
        <UiText data-size="xs">{{ $t('footer.text') }} {{ version }} - {{ $t('footer.inspiration') }}</UiText>
        <UiText data-size="xs">
            <UiLink class="ml-1" as="a" href="https://codepen.io/nucliweb/pen/QEreae" target="_blank">/nucliweb/pen/QEreae</UiLink>
        </UiText>
    </div>
</template>
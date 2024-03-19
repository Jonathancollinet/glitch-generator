<script type="ts" setup>
import { version } from "~/utils/constants";
</script>
<template>
    <div class="flex justify-center pb-6 pt-12">
        <UiText data-size="xs">
            <!-- {{ $t("footer.text") }} {{ version }} - -->
            {{ $t("footer.text") }} -
            {{ $t("footer.inspiration") }}
        </UiText>
        <UiText data-size="xs">
            <UiLink class="ml-1" as="a" href="https://codepen.io/nucliweb/pen/QEreae" target="_blank">
                /nucliweb/pen/QEreae
            </UiLink>
        </UiText>
    </div>
</template>

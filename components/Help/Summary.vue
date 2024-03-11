<script lang="ts" setup>
const activeHelp = defineModel();

function active(part: string) {
    activeHelp.value = part;
}

function isActive(part: string) {
    return activeHelp.value === part;
}

function linkClass(part: string) {
    return {
        'text-primary-500 font-bold': isActive(part)
    };
}
</script>

<template>
  <div class="flex flex-col items-start">
    <UiButton :class="linkClass('tool')" variant="link" size="link" @click="active('tool')">{{ $t('pages.help.summary.tool') }}</UiButton>
    <UiButton :class="linkClass('input')" variant="link" size="link" @click="active('input')">{{ $t('pages.help.summary.input') }}</UiButton>
    <UiButton :class="linkClass('keyframes')" variant="link" size="link" @click="active('keyframes')">{{ $t('pages.help.summary.keyframes') }}</UiButton>
    <UiButton :class="linkClass('export')" variant="link" size="link" @click="active('export')">{{ $t('pages.help.summary.export') }}</UiButton>
    <UiButton :class="linkClass('import')" variant="link" size="link" @click="active('import')">{{ $t('pages.help.summary.import') }}</UiButton>
    <UiButton :class="linkClass('presets')" variant="link" size="link" @click="active('presets')">{{ $t('pages.help.summary.presets') }}</UiButton>
  </div>
</template>
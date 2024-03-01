<script lang="ts" setup>

</script>

<template>
  <div class="border border-neutral-400 rounded-2xl mb-4 last:mb-0">
    <div class="*:m-0 px-4 py-2">
        <slot name="title" />
    </div>
    <div class="">
        <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal';
</script>
<template>
  <NuxtLayout>
	  <NuxtPage :transition="{
        name: 'fade',
        mode: 'out-in'
      }" />
  </NuxtLayout>
  <ModalsContainer/>
</template>

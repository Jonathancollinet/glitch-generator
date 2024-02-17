<template>
  <NuxtLayout>
	  <NuxtPage :transition="{
        name: 'fade',
        mode: 'out-in'
      }" />
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>
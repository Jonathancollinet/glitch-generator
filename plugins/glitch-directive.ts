import { directiveCallback } from "./glitch/glitch";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('glitch', directiveCallback);
})
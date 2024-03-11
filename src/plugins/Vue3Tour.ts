import Vue3Tour from 'vue3-tour'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Tour).provide('tours', nuxtApp.vueApp.config.globalProperties.$tours);
})

import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Tour).provide('tours', nuxtApp.vueApp.config.globalProperties.$tours);
})

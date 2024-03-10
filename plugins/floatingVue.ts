import FloatingVue from 'floating-vue'

export default defineNuxtPlugin((nuxtApp) => {
    FloatingVue.options.themes.tooltip.delay.show = 0
    nuxtApp.vueApp.use(FloatingVue)
})

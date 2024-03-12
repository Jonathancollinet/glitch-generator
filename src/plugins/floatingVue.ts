import FloatingVue from 'floating-vue'

export default defineNuxtPlugin((nuxtApp) => {
    FloatingVue.options.themes.tooltip.distance = 10
    FloatingVue.options.themes.tooltip.delay.show = 0
    FloatingVue.options.themes.tooltip.triggers = ['hover'];
    nuxtApp.vueApp.use(FloatingVue)
})

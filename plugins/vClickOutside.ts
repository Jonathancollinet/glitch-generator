export type ClickOutside = {
    clickOutsideEvent: (event: Event) => void;
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el: HTMLElement & ClickOutside, binding) {
            el.clickOutsideEvent = (event: Event) => {
                if (!(el == event.target || el.contains(event.target as Node))) {
                    binding.value(event, el)
                }
            }
            if (process.client) {
                document.addEventListener("click", el.clickOutsideEvent)
            }
        },
        unmounted(el: HTMLElement & ClickOutside) {
            if (process.client) {
                document.removeEventListener("click", el.clickOutsideEvent)
            }
        },
        getSSRProps() {
            return {}
        }
    })
})

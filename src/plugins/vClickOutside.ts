export type ClickOutside = {
    clickOutsideEvent: (event: Event) => void;
    mouseupOutsideEvent: (event: Event) => void;
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("click-outside", {
        mounted(el: HTMLElement & ClickOutside, binding) {
            el.clickOutsideEvent = (event: Event) => {
                if (
                    !(el == event.target || el.contains(event.target as Node))
                ) {
                    binding.value(event, el);
                }
            };

            el.mouseupOutsideEvent = (event: Event) => {
                if (
                    !(el == event.target || el.contains(event.target as Node))
                ) {
                    binding.value(event, el);
                }
            };

            if (isClient()) {
                document.addEventListener("click", el.clickOutsideEvent);
                document.addEventListener("mouseup", el.mouseupOutsideEvent);
            }
        },
        unmounted(el: HTMLElement & ClickOutside) {
            if (isClient()) {
                document.removeEventListener("click", el.clickOutsideEvent);
                document.removeEventListener("mouseup", el.mouseupOutsideEvent);
            }
        },
        getSSRProps() {
            return {};
        },
    });
});

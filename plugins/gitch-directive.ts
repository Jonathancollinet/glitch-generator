import type { Config } from "~/types/config";

export const defaultConfig: Config = {
    fontSize: '16',
    color: '#000000'
}

const options: Config = {
    fontSize: defaultConfig.fontSize,
    color: defaultConfig.color
}

function applyOptions(config: Config) {
    if (config.fontSize) {
        options.fontSize = config.fontSize;
    }
    if (config.color) {
        options.color = config.color;
    }
}

function applyStyle(el: HTMLElement) {
    if (options.fontSize) {
        el.style.fontSize = options.fontSize + 'px';
    }
    if (options.color) {
        el.style.color = options.color;
    }
}

function applyKeyFrames() {
    
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('glitch', (el, binding) => {
        const config: Config = binding.value || {};
        console.log("passed config -> ", config);
        applyOptions(config);
        applyStyle(el);
        applyKeyFrames();
    });
})

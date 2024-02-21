import type { DirectiveBinding } from "vue";
import type { GlitchError, GlitchConfig } from './types';
import { GlitchValidator } from "./validator";

let currentGlitch: Glitch | null = null;

export function directiveCallback(el: HTMLElement, bindings: DirectiveBinding<GlitchConfig>) {
    if (!currentGlitch) {
        currentGlitch = new Glitch(bindings.value, el);
    } else {
        currentGlitch.computeConfig(bindings.value);
    }
}

class Glitch {
    private config: GlitchConfig;
    private validator: GlitchValidator;
    private el: HTMLElement;

    constructor(config: GlitchConfig, el: HTMLElement) {
        this.config = config;
        this.el = el;
        this.validator = new GlitchValidator();
        this.computeConfig(this.config);
    }

    computeConfig(newConfig: GlitchConfig) {
        const success = this.validator.validateConfig(newConfig, this.config);

        if (success) {
            this.config = newConfig;
            this.generateGlitch();
        }
    }

    private generateGlitch() {
        console.log("can generate glitch now")
    }
}
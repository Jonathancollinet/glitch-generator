import type { DirectiveBinding } from "vue";
import type {
    GlitchError,
    GlitchConfig
} from './types';
import { validateConfig } from "./validator";
import { generateGlitch } from "./generate";
import { logErrors } from "./utils";

let localConfig: GlitchConfig = defaultGlitchConfig;

export function directiveCallback(el: HTMLElement, bindings: DirectiveBinding<GlitchConfig>) {
    const propConfig = bindings.value;
    const errors: GlitchError[] = validateConfig(propConfig, localConfig);

    if (errors.length) {
        if (propConfig.onErrors) {
            propConfig.onErrors(errors)
        } else {
            logErrors(errors);
        }
    } else {
        localConfig = propConfig;
        generateGlitch(el, localConfig);
    }
}
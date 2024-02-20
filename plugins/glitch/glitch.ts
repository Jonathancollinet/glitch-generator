import type { DirectiveBinding } from "vue";
import type {
    GlitchError,
    _GlitchConfig
} from './types';
import { validateConfig, validateConfigDiffs } from "./validator";
import { generateGlitch } from "./generate";
import _set from 'lodash.set';

let localConfig: _GlitchConfig = defaultGlitchConfig;

function logErrors(errors: GlitchError[]) {
    errors.forEach(error => {
        console.error(`Error: ${error.code} at ${error.property}: ${error.message}`);
    });
}

export function directiveCallback(el: HTMLElement, bindings: DirectiveBinding<_GlitchConfig>) {
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
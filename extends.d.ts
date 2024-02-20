import { FunctionDirective } from 'vue';
import type { _GlitchConfig } from '~/plugins/gitch-directive';

declare module 'vue' {
    export interface ComponentCustomProperties {
        vGlitch: FunctionDirective<HTMLElement, _GlitchConfig>;
    }
}

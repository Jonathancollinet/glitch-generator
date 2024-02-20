import { FunctionDirective } from 'vue';
import type { GlitchConfig } from '~/plugins/gitch-directive';

declare module 'vue' {
    export interface ComponentCustomProperties {
        vGlitch: FunctionDirective<HTMLElement, GlitchConfig>;
    }
}

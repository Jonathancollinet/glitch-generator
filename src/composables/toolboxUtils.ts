import type { GlitchErrors } from '~/glitch/types';
import { getErrorMessage, applyUpdater } from '~/utils/Toobox/utils'
import { defineModel, defineProps } from 'vue';

export const useToolboxUtils = <Config>() => {
    const config = defineModel<Config>('config', { required: true });
    const localConfig = defineModel<Config>('localConfig', { required: true });
    
    const props = defineProps<{
        errors: Partial<GlitchErrors>,
    }>()

    return {
        config,
        localConfig,
        errors: props.errors,
        getErrorMessage,
        applyUpdater,
    }
}

import type { GlitchConfig, GlitchError, GlitchTextShadowField } from './types';
import { GlitchValidator } from "./validator";

export default class Glitch {
    private config: GlitchConfig;
    private validator: GlitchValidator;

    constructor(config: GlitchConfig) {
        this.config = this.getConfigCopy(config);
        this.validator = new GlitchValidator();
    }

    computeConfig(newConfig: GlitchConfig) {
        const success = this.validator.validateConfig(newConfig, this.config);

        if (success) {
            this.config = this.getConfigCopy(newConfig);
            return this.generateGlitch();
        }
    }

    onFieldsChange(fields: GlitchTextShadowField[]) {
        this.validator.onFieldsChange(this.config, fields);
    }

    getConfigCopy(config: GlitchConfig) {
        const rawConfig = toRaw(config);

        // we need to keep functions in safety before the serialization
        const functions = {
            onValidated: rawConfig.onValidated,
            onFieldsChange: rawConfig.onFieldsChange
        };

        const _config: GlitchConfig = JSON.parse(JSON.stringify(rawConfig));

        _config.onValidated = functions.onValidated;
        _config.onFieldsChange = functions.onFieldsChange;

        return _config;
    }

    private generateGlitch() {
        return {
            message: this.config.text.message,
            textStyle: this.generateStyle(),
            keyframes: this.generateKeyframes()
        }
    }

    private generateStyle() {
        return {
            fontSize: `${this.config.text.size}${this.config.text.unit}`,
            color: this.config.text.color.hex
        }
    }

    private generateKeyframes() {
        return []
    }
}
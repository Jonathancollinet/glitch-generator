import type { GlitchConfig, GlitchError, GlitchShadowField } from './types';
import GlitchValidator from "./validator";
import GlitchKeyframes from './keyframes';

export default class Glitch {
    private config: GlitchConfig;
    private validator: GlitchValidator;
    private keyframes: GlitchKeyframes;

    constructor(config: GlitchConfig) {
        this.config = this.getConfigCopy(config);
        this.keyframes = new GlitchKeyframes();
        this.validator = new GlitchValidator();
    }

    destroy() {
        if (process.client) {
            this.keyframes.destroy();
        }
    }

    computeConfig(newConfig: GlitchConfig) {
        const success = this.validator.validateConfig(newConfig, this.config);

        if (success) {
            this.config = this.getConfigCopy(newConfig);
            const style = this.getTextStyle();

            if (process.client && !this.config.preventRangesValidation) {
                this.keyframes.add(this.config);
            }

            return style;
        }
    }

    computeFields(fields?: GlitchShadowField[]) {
        if (fields?.length) {
            const success = this.validator.computeFields(this.config, fields);

            if (success) {
                this.keyframes.add(this.config, fields);
            }
        } else {
            this.keyframes.generateKeyframesOnly(this.config);
        }
    }

    private getConfigCopy(config: GlitchConfig) {
        const rawConfig = toRaw(config);

        // we need to keep functions in safety before the serialization
        const functions = {
            onValidated: rawConfig.onValidated,
        };

        const _config: GlitchConfig = JSON.parse(JSON.stringify(rawConfig));

        _config.onValidated = functions.onValidated;

        return _config;
    }

    private getTextStyle() {
        return {
            message: this.config.text.message,
            textStyle: this.generateStyle(),
        }
    }

    private generateStyle() {
        return {
            fontSize: `${this.config.text.size}${this.config.text.unit}`,
            color: hexToRGB(this.config.text.color.hex, this.config.text.color.alphaPercent),
            animationName: 'glitch',
            animationDuration: `${this.config.animation.duration}ms`,
            animationTimingFunction: 'steps(100)',
            animationIterationCount: 'infinite',
            animationPlayState: 'running',
        }
    }
}
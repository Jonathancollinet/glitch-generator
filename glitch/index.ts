import type {
    GlitchConfig,
    GlitchShadowField
} from './types';
import GlitchValidator from "./validator";
import GlitchKeyframes from './keyframes';

export default class Glitch {
    private config: GlitchConfig;
    private validator: GlitchValidator;
    private keyframes: GlitchKeyframes;

    constructor(config: GlitchConfig, el: HTMLElement | null) {
        this.config = this.getConfigCopy(config);
        this.keyframes = new GlitchKeyframes(el);
        this.validator = new GlitchValidator();

        if (!this.hasAnimationBrowserCompatibility()) {
            this.config.controls = false;
        }
    }

    destroy() {
        if (process.client) {
            this.keyframes.destroy();
        }
    }

    async computeConfig(newConfig: GlitchConfig, forceRangeCompute?: boolean) {
        const success = this.validator.validateConfig(newConfig, this.config);

        if (success) {
            this.config = this.getConfigCopy(newConfig);
            const style = this.getTextStyle();

            if (process.client && (forceRangeCompute || !this.config.preventRangesCompute)) {
                this.keyframes.compute(this.config);
            }

            if (!this.config.controls && this.keyframes.animation?.playState === 'idle') {
                this.keyframes.animation?.play();
            }

            return style;
        }
    }

    computeFields(fields?: GlitchShadowField[]) {
        if (fields?.length) {
            const success = this.validator.computeFields(this.config, fields);

            if (success) {
                this.keyframes.compute(this.config, fields);
            }
        } else {
            this.keyframes.generateKeyframesOnly(this.config);
        }
    }

    hasAnimationBrowserCompatibility() {
        return this.keyframes.hasAnimationBrowserCompatibility();
    }

    play() {
        this.keyframes.play();
    }

    pause() {
        this.keyframes.pause();
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
        const animation: any = {};

        if (!this.keyframes.animation) {
            animation.animationDuration = `${this.config.animation.duration}ms`;
            animation.animationTimingFunction = 'steps(100)';
            animation.animationIterationCount = 'infinite';
            animation.animationPlayState = 'running';
        }
        return {
            fontSize: `${this.config.text.size}${this.config.text.unit}`,
            color: hexToRGB(this.config.text.color.hex, this.config.text.color.alphaPercent),
            ...animation
        }
    }
}
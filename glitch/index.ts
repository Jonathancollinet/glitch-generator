import type {
    AnimationBindings,
    GlitchAnimationProperty,
    GlitchConfig,
    GlitchShadowField
} from './types';
import GlitchValidator from "./validator";
import GlitchKeyframes from './keyframes';
import GlitchController from './controller';

export default class Glitch {
    private config: GlitchConfig;
    private validator: GlitchValidator;
    private keyframes: GlitchKeyframes;
    controller: GlitchController;

    constructor(config: GlitchConfig) {
        this.config = this.getConfigCopy(config);
        this.keyframes = new GlitchKeyframes();
        this.validator = new GlitchValidator();
        this.controller = new GlitchController(this.keyframes.animation);

        if (process.client && !this.hasAnimationBrowserCompatibility()) {
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

            if (this.hasAnimationBrowserCompatibility() && this.keyframes.animation?.playState === 'idle') {
                this.keyframes.animation?.play();
            }

            return style;
        }
    }

    computeFields(fields: GlitchShadowField[]) {
        const success = this.validator.computeFields(this.config, fields);

        if (success) {
            this.keyframes.compute(this.config, fields);

            return true;
        }

        return false;
    }

    exportKeyframes() {
        return this.keyframes.getKeyframesString(this.config)
    }

    generateKeyframesOnly() {
        this.keyframes.generateKeyframesOnly(this.config);
    }

    replaceAnimationDuration(duration: number) {
        this.keyframes.replaceAnimationDuration(duration);
    }

    hasAnimationBrowserCompatibility() {
        return this.keyframes.hasAnimationBrowserCompatibility();
    }

    setGlitchedElement(element: HTMLElement) {
        this.keyframes.setGlitchedElement(element);
    }

    private getConfigCopy(config: GlitchConfig) {
        const rawConfig = toRaw(config);

        // we need to keep functions in safety before the serialization
        const functions = {
            onValidated: rawConfig.onValidated,
        };

        const _config: GlitchConfig = deepCopy(rawConfig);

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
        const animation: AnimationBindings = {};

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
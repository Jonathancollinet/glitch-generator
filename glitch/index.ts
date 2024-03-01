import type {
    AnimationBindings,
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
    controller: GlitchController | null;

    constructor(config: GlitchConfig) {
        this.config = this.getConfigCopy(config);
        this.keyframes = new GlitchKeyframes();
        this.validator = new GlitchValidator();
        this.controller = null;

        if (process.client) {
            if (this.hasAnimationBrowserCompatibility()) {
                this.controller = new GlitchController(<Animation>this.keyframes.animation);
            } else {
                this.config.controls = false;
            }
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
                this.keyframes.generate(this.config);
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
            fields.forEach((field) => {
                this.config.ranges[field.range][field.index] = deepCopy(field);
            });
            this.keyframes.generate(this.config, fields);

            return true;
        }

        return false;
    }

    exportKeyframes() {
        return this.keyframes.getKeyframesString(this.config)
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
            height: `${this.config.text.height}px`,
            padding: `${this.config.text.padding}px`,
            backgroundColor: hexToRGB(this.config.text.bgColor.hex, this.config.text.bgColor.alphaPercent),
            ...animation
        }
    }
}
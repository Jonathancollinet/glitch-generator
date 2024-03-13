import type {
    AnimationBindings,
    ContainerBindings,
    GlitchBindings,
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

    validateConfig(config: GlitchConfig) {
        return this.validator.validateConfigWithErrors(config, this.config)
    }

    computeConfig(newConfig: GlitchConfig, forceRangeCompute?: boolean) {
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
        const success = this.validator.validateFields(this.config, fields);

        if (success) {
            fields.forEach((field) => {
                this.config.ranges[field.range][field.index] = deepCopy(field);
            });
            this.keyframes.generate(this.config, fields);

            return true;
        }

        return false;
    }

    getDataToExport() {
        return {
            css: `${this.getTextClassText()}\n\n${this.getKeyframesString()}`,
            js: this.getAnimationText(),
            config: JSON.stringify({
                text: this.config.text,
                animation: this.config.animation,
                ranges: this.config.ranges,
            }, null, 2)
        }
    }

    getKeyframesString() {
        return this.keyframes.getKeyframesString(true);
    }

    replaceAnimationDuration(config: GlitchConfig) {
        const validate = this.computeConfig(config);

        if (validate) {
            this.keyframes.generateAnimation(config);
        }
    }

    hasAnimationBrowserCompatibility() {
        return this.keyframes.hasAnimationBrowserCompatibility();
    }

    setGlitchedElement(element: HTMLElement) {
        this.keyframes.setGlitchedElement(element);
    }

    removeRange(range: number) {
        this.config.ranges.splice(range, 1);
        this.keyframes.generate(this.config);
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

    private generateStyle(forExport: boolean = false): GlitchBindings['textStyle'] {
        const animation: AnimationBindings = {};
        const containerStyle: ContainerBindings = {};
        const configText = this.config.text;

        if (!this.keyframes.animation || forExport) {
            animation.animationName = 'glitch';
            animation.animationDuration = `${this.config.animation.duration}ms`;
            animation.animationTimingFunction = 'steps(100)';
            animation.animationIterationCount = 'infinite';
            animation.animationPlayState = 'running';
        }

        if (forExport) {
            containerStyle.display = 'flex';
            containerStyle.alignItems = 'center';
            containerStyle.justifyContent = 'center';
        }

        return {
            ...containerStyle,
            fontSize: `${configText.size}${configText.unit}`,
            color: hexToRGB(configText.color.hex, configText.color.alphaPercent),
            height: `${configText.height}px`,
            padding: `${configText.padding}px`,
            borderRadius: `${configText.borderRadius}px`,
            backgroundColor: hexToRGB(configText.bgColor.hex, configText.bgColor.alphaPercent),
            ...animation
        }
    }

    private getTextClassText() {
        const style = this.generateStyle(true);
        let elementStyle = "";

        let property: keyof typeof style;
        for (property in style) {
            const kebabProperty = property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

            elementStyle += `\t${kebabProperty}: ${style[property]};\n`;
        }

        return `#text {\n${elementStyle}}`;
    }

    private getAnimationText() {
        return `const target = document.querySelector('.my-text-element');
const effect = ${JSON.stringify(this.keyframes.getKeyframesEffect(), null, 2)};
const options = {
    duration: ${this.config.animation.duration},
    iterations: Infinity
};
const keyframeEffect = new KeyframeEffect(
    target,
    effect,
    options
);
const animation = new Animation(keyframeEffect);

animation.play();`;
    }
}
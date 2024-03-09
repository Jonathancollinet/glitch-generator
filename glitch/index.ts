import type {
    AnimationBindings,
    ContainerBindings,
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
        const style = this.generateStyle(true);
        let elementStyle = "";

        let property: keyof typeof style;
        for (property in style) {
            const kebabProperty = property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

            elementStyle += `\t${kebabProperty}: ${style[property]};\n`;
        }
        
        return {
            elementStyle,
            keyframes: this.keyframes.getKeyframesString(this.config, true)
        }
    }

    async replaceAnimationDuration(config: GlitchConfig) {
        const validate = await this.computeConfig(config);

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

    private generateStyle(forExport: boolean = false) {
        const animation: AnimationBindings = {};
        const containerStyle: ContainerBindings = {};

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
            fontSize: `${this.config.text.size}${this.config.text.unit}`,
            color: hexToRGB(this.config.text.color.hex, this.config.text.color.alphaPercent),
            height: `${this.config.text.height}px`,
            padding: `${this.config.text.padding}px`,
            backgroundColor: hexToRGB(this.config.text.bgColor.hex, this.config.text.bgColor.alphaPercent),
            ...animation
        }
    }
}
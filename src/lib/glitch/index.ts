import G from "./types";
import GlitchValidator from "./validator";
import GlitchKeyframes from "./keyframes";
import GlitchController from "./controller";
import { formatJSON } from "~/utils";

export default class Glitch {
    private config: G.Config;
    private validator: GlitchValidator;
    private keyframes: GlitchKeyframes;
    controller: GlitchController | null;

    constructor(config: G.Config) {
        this.config = this.getConfigCopy(config);
        this.keyframes = new GlitchKeyframes();
        this.validator = new GlitchValidator();
        this.controller = null;

        if (isClient()) {
            if (this.canUseAnimation()) {
                this.controller = new GlitchController(<Animation>this.keyframes.animation);
            } else {
                this.config.controls = false;
            }
        }
    }

    destroy() {
        if (isClient()) {
            this.keyframes.destroy();
        }
    }

    validateConfig(config: G.Config) {
        return this.validator.validateConfigWithErrors(config, this.config);
    }

    computeConfig(newConfig: G.Config, forceRangeCompute?: boolean) {
        const success = this.validator.validateConfig(newConfig, this.config);

        if (success) {
            this.config = this.getConfigCopy(newConfig);

            if (isClient() && (forceRangeCompute || !this.config.preventRangesCompute)) {
                this.keyframes.generate(this.config);
            }
            if (this.canUseAnimation() && this.isPlayState("idle")) {
                this.keyframes.animation?.play();
            }

            return {
                config: this.config,
                bindings: this.getTextBindings(),
            };
        }
    }

    computeFields(fields: G.Field[]) {
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
            config: formatJSON({
                text: this.config.text,
                animation: this.config.animation,
                ranges: this.config.ranges,
            }),
        };
    }

    getKeyframesString() {
        return this.keyframes.getKeyframesString(true);
    }

    replaceAnimationDuration(config: G.Config) {
        const validate = this.computeConfig(config);

        if (validate) {
            this.keyframes.generateAnimation(config);
        }
    }

    canUseAnimation() {
        return this.keyframes.canUseAnimation();
    }

    setGlitchedElement(element: HTMLElement) {
        this.keyframes.setGlitchedElement(element);
    }

    removeRange(range: number) {
        this.config.ranges.splice(range, 1);
        this.keyframes.generate(this.config);
    }

    private getPlayState() {
        return this.keyframes.animation?.playState;
    }

    private isPlayState(state: AnimationPlayState | string) {
        return this.getPlayState() === state;
    }

    private getConfigCopy(config: G.Config) {
        const rawConfig = toRaw(config);
        const functions = {
            onValidated: rawConfig.onValidated,
        };
        const _config: G.Config = deepCopy(rawConfig);

        _config.onValidated = functions.onValidated;

        return _config;
    }

    private getTextBindings() {
        return {
            message: this.config.text.message,
            textStyle: this.getTextStyle(),
        };
    }

    private getTextStyle(forExport: boolean = false): G.Bindings["textStyle"] {
        const animationStyle: G.AnimationStyle = {};
        const containerStyle: G.ContainerStyle = {};
        const configText = this.config.text;

        if (!this.keyframes.animation || forExport) {
            animationStyle.animationName = "glitch";
            animationStyle.animationDuration = `${this.config.animation.duration}ms`;
            animationStyle.animationTimingFunction = "steps(100)";
            animationStyle.animationIterationCount = "infinite";
            animationStyle.animationPlayState = "running";
        }
        if (forExport) {
            containerStyle.display = "flex";
            containerStyle.alignItems = "center";
            containerStyle.justifyContent = "center";
        }

        return {
            ...containerStyle,
            fontSize: `${configText.size}${configText.unit}`,
            color: hexToRGB(configText.color.hex, configText.color.alphaPercent),
            height: `${configText.height}px`,
            padding: `${configText.padding}px`,
            borderRadius: `${configText.borderRadius}px`,
            backgroundColor: hexToRGB(configText.bgColor.hex, configText.bgColor.alphaPercent),
            ...animationStyle,
        };
    }

    private getTextClassText() {
        const style = this.getTextStyle(true);
        let elementStyle = "";

        let property: keyof typeof style;
        for (property in style) {
            const kebabProperty = property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

            elementStyle += `\t${kebabProperty}: ${style[property]};\n`;
        }

        return `#text {\n${elementStyle}}`;
    }

    private getAnimationText() {
        return `const target = document.querySelector('.my-text-element');
const effect = ${formatJSON(this.keyframes.getKeyframesEffect())};
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

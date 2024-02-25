import { GlitchAnimationProperty, type GlitchAnimationPropertyUnion, type GlitchConfig, type GlitchShadowField } from "./types";

type Frame = Record<GlitchAnimationPropertyUnion, string[]>;

export default class GlitchKeyframes {
    private styleNode: HTMLStyleElement | null;
    private generatedFrames: { [key: number]: Frame };
    private glitchedElement: HTMLElement | null;
    animation: Animation | null;

    constructor() {
        this.styleNode = null;
        this.generatedFrames = {};
        this.glitchedElement = null;

        if (process.client && this.hasAnimationBrowserCompatibility()) {
            this.animation = new Animation(new KeyframeEffect(null, []));
        } else {
            this.animation = null;
        }
    }

    destroy() {
        if (this.styleNode) {
            this.styleNode.remove();
        }
    }

    compute(config: GlitchConfig, fields?: GlitchShadowField[]) {
        this.generateFrames(config, fields);
        this.generateAnimation(config);
    }

    generateKeyframesOnly(config: GlitchConfig) {
        this.generateAnimation(config);
    }

    selectAnimationAt(percent: number) {
        if (this.animation) {
            const effect = this.animation.effect;
            const timing = effect?.getComputedTiming();
            const duration = timing?.duration as number;

            this.animation.currentTime = (duration / 100) * percent;
        }
    }

    replaceAnimationDuration(duration: number) {
        if (this.animation) {
            this.animation.effect?.updateTiming({ duration });
        }
    }

    playState() {
        if (this.animation) {
            return this.animation.playState;
        }
    }

    play() {
        if (this.animation) {
            this.animation.play();
        }
    }

    pause() {
        if (this.animation) {
            this.animation.pause();
        }
    }

    getCurrentTime() {
        if (this.animation) {
            return this.animation.currentTime;
        }
    }

    setGlitchedElement(element: HTMLElement) {
        this.glitchedElement = element;
        if (this.animation?.effect) {
            (this.animation.effect as KeyframeEffect).target = element;
        }
    }

    private generateAnimation(config: GlitchConfig) {
        if (this.animation) {
            this.createAnimation(config);
        } else {
            this.injectHeadStyle(this.getKeyframesString(config));
        }
    }

    private createAnimation(config: GlitchConfig) {
        const effect = new KeyframeEffect(
            this.glitchedElement,
            this.getKeyframesEffect(config),
            {
                duration: config.animation.duration,
                iterations: Infinity
            }
        );

        if (this.animation) {
            this.animation.effect = effect;
        }
    }

    hasAnimationBrowserCompatibility() {
        return !!(window.KeyframeEffect && window.Animation);
    }

    private generateFrames(config: GlitchConfig, fields?: GlitchShadowField[]) {
        if (fields) {
            fields.forEach((field) => this.createFrame(config.animation.property, field));
        } else {
            config.ranges.forEach((range) => {
                range.forEach((field) => this.createFrame(config.animation.property, field));
            });
        }
    }

    private createFrame(globalProperty: GlitchAnimationPropertyUnion, field: GlitchShadowField) {
        const percent = field.offsetFrame;
        let frame = this.generatedFrames[percent];
        const computedProperty = field.property || globalProperty;

        if (!frame) {
            frame = {
                [GlitchAnimationProperty.BoxShadow]: [],
                [GlitchAnimationProperty.TextShadow]: []
            };
        }

        const cssValue = this.getCssPropertyValue(computedProperty, field);

        if (!frame[computedProperty]) {
            frame[computedProperty] = [cssValue];
        } else {
            frame[computedProperty][field.range] = cssValue;
        }

        // this.removeOtherProperties(frame, computedProperty);
        this.replaceOtherPropertiesByFalse(frame, computedProperty);

        this.generatedFrames[percent] = frame;
    }

    // private removeOtherProperties(frame: Frame, property: GlitchAnimationPropertyUnion) {
    //     let key: GlitchAnimationPropertyUnion;
    //     for (key in frame) {
    //         if (key !== property) {
    //             delete frame[key];
    //         }
    //     }
    // }

    private replaceOtherPropertiesByFalse(frame: Frame, property: GlitchAnimationPropertyUnion) {
        let key: GlitchAnimationPropertyUnion;
        for (key in frame) {
            if (key !== property) {
                frame[key] = [this.getCssPropertyFalseValue(key)];
            }
        }
    }

    private getCssPropertyValue(property: GlitchAnimationPropertyUnion, field: GlitchShadowField) {
        if (property === GlitchAnimationProperty.TextShadow) {
            return `${field.offsetX}px ${field.offsetY}px ${field.blur}px ${field.color.hex}`
        }
        if (property === GlitchAnimationProperty.BoxShadow) {
            return `${field.offsetX}px ${field.offsetY}px ${field.blur}px ${field.spread}px ${field.color.hex}`
        }
        return "";
    }

    private getCssPropertyFalseValue(property: GlitchAnimationPropertyUnion) {
        if (property === GlitchAnimationProperty.TextShadow) {
            return '0px 0px 0px transparent';
        }
        if (property === GlitchAnimationProperty.BoxShadow) {
            return '0px 0px 0px 0px transparent';
        }
        return "";
    }

    private getKeyframesEffect(config: GlitchConfig) {
        const effect: Keyframe[] = [];
        for (const percent in this.generatedFrames) {
            const framesAt = this.generatedFrames[percent];
            const keyframe: Keyframe = {};

            let property: GlitchAnimationPropertyUnion;
            for (property in framesAt) {
                if (framesAt[property].length) {
                    framesAt[property].forEach((frame, index) => {
                        const camelProperty = property.replace(/-./g, x=>x[1].toUpperCase())
                        if (!keyframe[camelProperty]) {
                            keyframe[camelProperty] = frame;
                        } else {
                            keyframe[camelProperty] += `, ${frame}`;
                        }
                    });
                }
            }

            keyframe.offset = Number(percent) / 100;

            effect.push(keyframe);
        }

        return effect;
    }

    private getKeyframesString(config: GlitchConfig) {
        let keyframes = '@keyframes glitch {';

        for (const percent in this.generatedFrames) {
            const framesAt = this.generatedFrames[percent];

            keyframes += ` ${percent}% { `;

            let property: GlitchAnimationPropertyUnion;
            for (property in framesAt) {
                const frameProperty = framesAt[property];

                if (frameProperty && frameProperty.length) {
                    const lastFrameIndex = frameProperty.length - 1;

                    keyframes += `${property}: `;

                    frameProperty.forEach((frame, frameIndex) => {
                        keyframes += `${frame}`;

                        if (frameIndex !== lastFrameIndex) {
                            keyframes += ', ';
                        }
                    });
                    keyframes += '; ';
                }
            }
            keyframes += '; }';
        }

        return keyframes + '}';
    }

    private injectHeadStyle(keyframes: string) {
        if (!this.styleNode) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            const textNode = document.createTextNode(keyframes)

            style.appendChild(textNode);
            head.appendChild(style);
            this.styleNode = style;
        } else {
            this.styleNode.innerHTML = keyframes;
        }
    }
}
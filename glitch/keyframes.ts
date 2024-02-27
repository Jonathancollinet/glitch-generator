import { GlitchAnimationProperty, type GlitchAnimationPropertyUnion, type GlitchConfig, type GlitchShadowField, type GlitchShadowProperty } from "./types";

type GeneratedFrames = {
    [key: string]: {
        [key in GlitchAnimationProperty]: string[]
    }
};

export default class GlitchKeyframes {
    private styleNode: HTMLStyleElement | null;
    private generatedFrames: GeneratedFrames;
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

    hasAnimationBrowserCompatibility() {
        return !!(window.KeyframeEffect && window.Animation);
    }

    generate(config: GlitchConfig, fields?: GlitchShadowField[]) {
        this.generateFrames(config, fields);
        this.generateAnimation(config);
    }

    replaceAnimationDuration(duration: number) {
        if (this.animation) {
            this.animation.effect?.updateTiming({ duration });
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

    private generateFrames(config: GlitchConfig, fields?: GlitchShadowField[]) {
        if (fields) {
            fields.forEach((field) => this.createFrame(field, config.ranges[field.range][field.index + 1]));
        } else {
            config.ranges.forEach((range) => {
                range.forEach((field) => this.createFrame(field, config.ranges[field.range][field.index + 1]));
            });
        }
    }

    private createFrame(field: GlitchShadowField, nextField?: GlitchShadowField) {
        let propertyName: GlitchAnimationPropertyUnion;

        for (propertyName in field.properties) {
            const fieldProperty = field.properties[propertyName];

            if (fieldProperty?.fillAllFrames) {
                const nextPercent = nextField?.offsetFrame || 100;
                const length = nextPercent - field.offsetFrame;

                for (let i = 0; i < length; ++i) {
                    const percent = field.offsetFrame + i;

                    if (fieldProperty.enabled) {
                        this.setFrame(propertyName, field, percent);
                    } else {
                        this.generatedFrames[percent][propertyName] = [];
                    }
                }
            } else {
                if (fieldProperty?.enabled) {
                    this.setFrame(propertyName, field, field.offsetFrame);
                } else {
                    this.generatedFrames[field.offsetFrame][propertyName] = [];
                }
            }
        }
    }

    private setFrame(propertyName: GlitchAnimationPropertyUnion, field: GlitchShadowField, percent: number) {
        const property = field.properties[propertyName];

        if (property) {
            let frame = this.generatedFrames[percent];

            if (!frame) {
                frame = {
                    [GlitchAnimationProperty.BoxShadow]: [],
                    [GlitchAnimationProperty.TextShadow]: [],
                };
            }

            if (!frame[propertyName]) {
                frame[propertyName] = [];
            }

            frame[propertyName][field.range] = this.getCssPropertyValue(propertyName, property);;
            this.generatedFrames[percent] = frame;
        }
    }

    private getCssPropertyValue(propertyName: GlitchAnimationPropertyUnion, property: GlitchShadowProperty) {
        if (propertyName === GlitchAnimationProperty.TextShadow) {
            return `${property.offsetX}px ${property.offsetY}px ${property.blur}px ${property.color.hex}`;
        }

        if (propertyName === GlitchAnimationProperty.BoxShadow) {
            return `${property.offsetX}px ${property.offsetY}px ${property.blur}px ${property.spread}px ${property.color.hex}`;
        }

        return "";
    }

    private getKeyframesEffect(config: GlitchConfig) {
        const effect: Keyframe[] = [];

        for (const percent in this.generatedFrames) {
            const frame = this.generatedFrames[percent];
            const keyframe: Keyframe = {};
            let propertyName: GlitchAnimationPropertyUnion;
            
            for (propertyName in frame) {
                const frameProperty = frame[propertyName];

                if (frameProperty?.length) {
                    frameProperty.forEach((frame, index) => {
                        const camelProperty = propertyName.replace(/-./g, x => x[1].toUpperCase());

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

    getKeyframesString(config: GlitchConfig) {
        let keyframes = '@keyframes glitch {';

        for (const percent in this.generatedFrames) {
            const framesAt = this.generatedFrames[percent];
            let property: GlitchAnimationPropertyUnion;

            keyframes += ` ${percent}% { `;

            for (property in framesAt) {
                const frameProperty = framesAt[property];

                if (frameProperty?.length) {
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

            keyframes += '}';
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
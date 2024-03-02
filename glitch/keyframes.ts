import { GlitchAnimationProperty, type GlitchAnimationPropertyUnion, type GlitchConfig, type GlitchShadowField, type GlitchShadowProperty } from "./types";

type GeneratedFrames = {
    [key: string]: {
        [key in GlitchAnimationProperty]?: string[]
    }
};

export default class GlitchKeyframes {
    animation: Animation | null;
    private styleNode: HTMLStyleElement | null;
    private generatedFrames: GeneratedFrames;
    private glitchedElement: HTMLElement | null;

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
            this.bindKeyframeEffect(config);
        } else {
            this.injectHeadStyle(this.getKeyframesString(config));
        }
    }

    private bindKeyframeEffect(config: GlitchConfig) {
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
            const nextPercent = nextField?.offsetFrame ?? 101;

            if (fieldProperty) {
                if (fieldProperty.fillAllFrames) {
                    const length = nextPercent - field.offsetFrame;

                    for (let i = 0; i < length; ++i) {
                        const percent = field.offsetFrame + i;

                        if (fieldProperty.enabled) {
                            this.setFrame(propertyName, field, percent);
                        } else {
                            this.setEmptyFrame(percent, propertyName, field.range);
                        }
                    }
                } else {
                    for (let i = field.offsetFrame; i < nextPercent; ++i) {
                        this.setEmptyFrame(i, propertyName, field.range);
                    }
                    if (fieldProperty.enabled) {
                        this.setFrame(propertyName, field, field.offsetFrame);
                    } else {
                        this.setEmptyFrame(field.offsetFrame, propertyName, field.range);
                    }
                }
            }
        }
    }

    private setEmptyFrame(percent: number, propertyName: GlitchAnimationPropertyUnion, range: number) {
        let frame = this.generatedFrames[percent];

        if (!frame) {
            frame = {};
        }

        if (!frame[propertyName]) {
            frame[propertyName] = [];
        }

        (<string[]>frame[propertyName])[range] = '';
        this.generatedFrames[percent] = frame;
    }

    private setFrame(propertyName: GlitchAnimationPropertyUnion, field: GlitchShadowField, percent: number) {
        const property = field.properties[propertyName];

        if (property) {
            let frame = this.generatedFrames[percent];

            if (!frame) {
                frame = {};
            }

            if (!frame[propertyName]) {
                frame[propertyName] = [];
            }

            (<string[]>frame[propertyName])[field.range] = this.getCssPropertyValue(propertyName, property);;
            this.generatedFrames[percent] = frame;
        }
    }

    private getCssPropertyValue(propertyName: GlitchAnimationPropertyUnion, property: GlitchShadowProperty) {
        const offsetX = property.offsetX;
        const offsetY = property.offsetY;
        const blur = property.blur;
        const spread = property.spread;
        const color = hexToRGB(property.color.hex, property.color.alphaPercent);
        let value = `${offsetX}px ${offsetY}px ${blur}px`;

        if (propertyName === GlitchAnimationProperty.BoxShadow) {
            value += ` ${spread}px`;
        }

        return value + ` ${color}`;
    }

    private getKeyframesEffect(config: GlitchConfig) {
        const effect: Keyframe[] = [];

        for (const percent in this.generatedFrames) {
            const frame = this.generatedFrames[percent];
            const keyframe: Keyframe = {};
            let propertyName: GlitchAnimationPropertyUnion;

            for (propertyName in frame) {
                const frameProperty = frame[propertyName];
                const filteredProperty = frameProperty?.filter((frame) => frame);

                if (filteredProperty?.length) {
                    filteredProperty.forEach((frame, index) => {
                        if (frame) {
                            const camelProperty = propertyName.replace(/-./g, x => x[1].toUpperCase());

                            if (!keyframe[camelProperty]) {
                                keyframe[camelProperty] = frame;
                            } else {
                                keyframe[camelProperty] += `, ${frame}`;
                            }
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
            let percentPushed = false;

            for (property in framesAt) {
                const frameProperty = framesAt[property];
                const filteredProperty = frameProperty?.filter((frame) => frame);

                if (filteredProperty?.length) {
                    const lastFrameIndex = filteredProperty.length - 1;

                    if (!percentPushed) {
                        keyframes += ` ${percent}% { `;
                        percentPushed = true;
                    }

                    keyframes += `${property}: `;

                    filteredProperty.forEach((frame, frameIndex) => {
                        if (frame) {
                            keyframes += `${frame}`;

                            if (frameIndex !== lastFrameIndex) {
                                keyframes += ', ';
                            }
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
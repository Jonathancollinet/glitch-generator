import { GlitchAnimationProperty, type GlitchAnimationPropertyUnion, type GlitchConfig, type GlitchShadowField } from "./types";

type Frame = Record<GlitchAnimationPropertyUnion, string[]>;

export default class GlitchKeyframes {
    private styleNode: HTMLStyleElement | null;
    private generatedFrames: { [key: number]: Frame };

    constructor() {
        this.styleNode = null;
        this.generatedFrames = {};
    }

    destroy() {
        if (this.styleNode) {
            this.styleNode.remove();
        }
    }

    add(config: GlitchConfig, fields?: GlitchShadowField[]) {
        this.injectHeadStyle(this.getKeyframes(config, fields));
    }

    generateKeyframesOnly(config: GlitchConfig) {
        this.injectHeadStyle(this.getKeyframesString(config));
    }

    private getKeyframes(config: GlitchConfig, fields?: GlitchShadowField[]) {
        if (fields) {
            fields.forEach((field) => this.createFrame(config.animation.property, field));
        } else {
            config.ranges.forEach((range) => {
                range.forEach((field) => this.createFrame(config.animation.property, field));
            });
        }

        return this.getKeyframesString(config);
    }

    private createFrame(globalProperty: GlitchAnimationPropertyUnion, field: GlitchShadowField) {
        const length = field.endPercent - field.startPercent + 1;

        for (let i = 0; i < length; ++i) {
            const percent = field.startPercent + i;
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
                frame[computedProperty].push(cssValue);
            }

            this.removeOtherProperties(frame, computedProperty);

            this.generatedFrames[percent] = frame;
            ++i;
        }
    }

    private removeOtherProperties(frame: Frame, property: GlitchAnimationPropertyUnion) {
        let key: GlitchAnimationPropertyUnion;
        for (key in frame) {
            if (key !== property) {
                delete frame[key];
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
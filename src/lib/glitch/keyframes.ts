import G from "~/lib/glitch/types";
import getPropertyData from "./propertitesData";

type GeneratedFrames = {
    [key: string]: {
        [key in G.PropertyName]?: string[];
    };
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

        if (isClient() && this.canUseAnimation()) {
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

    canUseAnimation() {
        return !!(window.KeyframeEffect && window.Animation);
    }

    generate(config: G.Config, fields?: G.Field[]) {
        this.generateFrames(config, fields);
        this.generateAnimation(config);
    }

    setGlitchedElement(element: HTMLElement) {
        this.glitchedElement = element;
    }

    generateAnimation(config: G.Config) {
        if (this.animation) {
            this.bindKeyframeEffect(config);
        } else {
            this.injectHeadStyle(this.getKeyframesString());
        }
    }

    getKeyframesEffect(generatedFrames: GeneratedFrames = this.generatedFrames, keyframes: Keyframe[] = []) {
        for (const percent in generatedFrames) {
            const frame = generatedFrames[percent];
            const keyframe: Keyframe = {};
            let propertyName: G.PropertyName;

            for (propertyName in frame) {
                const filteredProperty = frame[propertyName]?.filter((frame) => frame);

                if (filteredProperty?.length) {
                    filteredProperty.forEach((frame) => {
                        if (frame) {
                            const camelProperty = propertyName.replace(/-./g, (x) => x[1].toUpperCase());

                            if (!keyframe[camelProperty]) {
                                keyframe[camelProperty] = frame;
                            } else {
                                keyframe[camelProperty] += `, ${frame}`;
                            }
                        }
                    });
                }
            }
            if (Object.keys(keyframe).length) {
                keyframe.offset = Number(percent) / 100;
                keyframes.push(keyframe);
            }
        }

        return keyframes;
    }

    getKeyframesString(formatted: boolean = false) {
        const newLine = formatted ? "\n" : "";
        const tab = formatted ? "\t" : "";
        const doubleTab = formatted ? "\t\t" : "";
        let keyframes = `@keyframes glitch {${newLine}`;
        let previousBlock = "";
        let percentText = "";
        let block = "";

        for (const percent in this.generatedFrames) {
            const framesAt = this.generatedFrames[percent];
            let property: G.PropertyName;

            block = "";

            for (property in framesAt) {
                const frameProperty = framesAt[property];
                const filteredProperty = frameProperty?.filter((frame) => frame);

                if (filteredProperty?.length) {
                    const lastFrameIndex = filteredProperty.length - 1;
                    const propertyLengthInSpaces = `${property}: `.replace(/./g, " ");

                    block += `${doubleTab}${property}: `;
                    filteredProperty.forEach((frame, frameIndex) => {
                        if (frame) {
                            block += `${frame}`;

                            if (frameIndex !== lastFrameIndex) {
                                block += `, ${newLine}${doubleTab}${propertyLengthInSpaces}`;
                            }
                        }
                    });
                    block += `;${newLine}`;
                }
            }

            if (block) {
                if (!percentText) {
                    percentText += `${tab}${percent}%`;
                } else {
                    if (block === previousBlock) {
                        percentText += `,${newLine}${tab}${percent}%`;
                    }
                }

                if (!previousBlock && block) {
                    previousBlock = block;
                }
                if (block && block !== previousBlock) {
                    keyframes += `${percentText} {${newLine}${previousBlock}${tab}}${newLine}`;
                    previousBlock = block;
                    percentText = `${tab}${percent}%`;
                }
            }
        }

        if (previousBlock) {
            keyframes += `${percentText} {${newLine}${previousBlock}${tab}}${newLine}`;
        }

        return keyframes + "}";
    }

    private bindKeyframeEffect(config: G.Config) {
        const effect = new KeyframeEffect(this.glitchedElement, this.getKeyframesEffect(), {
            duration: config.animation.duration,
            iterations: Infinity,
        });

        this.mutateAnimation((animation: Animation) => {
            animation.effect = effect;
        });
    }

    private mutateAnimation(callback: (animation: Animation) => void) {
        if (this.animation) {
            let restart = false;

            if (this.animation.playState === "running") {
                restart = true;
            }

            this.animation.pause();
            callback(this.animation);

            if (restart) {
                this.animation.play();
            }
        }
    }

    private generateFrames(config: G.Config, fields?: G.Field[]) {
        if (fields) {
            fields.forEach((field) => this.createFrame(field, config.ranges[field.range][field.index + 1]));
        } else {
            this.generatedFrames = {};
            config.ranges.forEach((range) => {
                range.forEach((field) => this.createFrame(field, config.ranges[field.range][field.index + 1]));
            });
        }
    }

    private createFrame(field: G.Field, nextField?: G.Field) {
        let propertyName: G.PropertyName;

        for (propertyName in field.shadows) {
            const fieldProperty = field.shadows[propertyName];
            const nextPercent = nextField?.offsetFrame ?? 101;

            if (fieldProperty) {
                if (fieldProperty.enabled) {
                    if (fieldProperty.fillAllFrames) {
                        this.forAllFieldFrames(propertyName, field, nextPercent, (index: number) => {
                            this.setFrame(propertyName, field, field.offsetFrame + index);
                        });
                    } else {
                        this.emptyFieldFrames(propertyName, field, nextPercent);
                        this.setFrame(propertyName, field, field.offsetFrame);
                    }
                } else {
                    if (fieldProperty.fillAllFrames) {
                        this.emptyFieldFrames(propertyName, field, nextPercent);
                    } else {
                        this.setEmptyFrame(propertyName, field.range, field.offsetFrame);
                    }
                }
            }
        }
    }

    private emptyFieldFrames(propertyName: G.PropertyName, field: G.Field, nextPercent: number) {
        this.forAllFieldFrames(propertyName, field, nextPercent, (index: number) => {
            this.setEmptyFrame(propertyName, field.range, field.offsetFrame + index);
        });
    }

    private forAllFieldFrames(
        propertyName: G.PropertyName,
        field: G.Field,
        nextPercent: number,
        callback: (index: number) => void,
    ) {
        const length = nextPercent - field.offsetFrame;

        for (let i = 0; i < length; ++i) {
            callback(i);
        }
    }

    private setEmptyFrame(propertyName: G.PropertyName, range: number, percent: number) {
        const frame = this.generatedFrames[percent];

        if (!frame) {
            return;
        }
        if (frame && !frame[propertyName]) {
            return;
        }

        const propertyFrames = frame[propertyName] as string[];

        if (!propertyFrames[range]) {
            return;
        }

        delete propertyFrames[range];

        if (propertyFrames.length === 0) {
            delete frame[propertyName];
        }
        if (Object.keys(frame).length === 0) {
            delete this.generatedFrames[percent];
        }
    }

    private setFrame(propertyName: G.PropertyName, field: G.Field, percent: number) {
        const property = field.shadows[propertyName];

        if (property) {
            let frame = this.generatedFrames[percent];

            if (!frame) {
                frame = {};
            }
            if (!frame[propertyName]) {
                frame[propertyName] = [];
            }

            (frame[propertyName] as string[])[field.range] = getPropertyData[propertyName](property);
            this.generatedFrames[percent] = frame;
        }
    }

    private injectHeadStyle(keyframes: string) {
        if (!this.styleNode) {
            const head = document.head || document.getElementsByTagName("head")[0];
            const style = document.createElement("style");
            const textNode = document.createTextNode(keyframes);

            style.appendChild(textNode);
            head.appendChild(style);
            this.styleNode = style;
        } else {
            this.styleNode.innerHTML = keyframes;
        }
    }
}

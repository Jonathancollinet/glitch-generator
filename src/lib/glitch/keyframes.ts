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
        if (this.animation?.effect) {
            (this.animation.effect as KeyframeEffect).target = element;
        }
    }

    generateAnimation(config: G.Config) {
        if (this.animation) {
            this.bindKeyframeEffect(config);
        } else {
            this.injectHeadStyle(this.getKeyframesString());
        }
    }

    getKeyframesEffect() {
        const effect: Keyframe[] = [];

        for (const percent in this.generatedFrames) {
            const frame = this.generatedFrames[percent];
            const keyframe: Keyframe = {};
            let propertyName: G.PropertyName;

            for (propertyName in frame) {
                const frameProperty = frame[propertyName];
                const filteredProperty = frameProperty?.filter(
                    (frame) => frame,
                );

                if (filteredProperty?.length) {
                    filteredProperty.forEach((frame) => {
                        if (frame) {
                            const camelProperty = propertyName.replace(
                                /-./g,
                                (x) => x[1].toUpperCase(),
                            );

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
                effect.push(keyframe);
            }
        }

        return effect;
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
                const filteredProperty = frameProperty?.filter(
                    (frame) => frame,
                );

                if (filteredProperty?.length) {
                    const lastFrameIndex = filteredProperty.length - 1;
                    const propertyLengthInSpaces = `${property}: `.replace(
                        /./g,
                        " ",
                    );

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
        const effect = new KeyframeEffect(
            this.glitchedElement,
            this.getKeyframesEffect(),
            {
                duration: config.animation.duration,
                iterations: Infinity,
            },
        );

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
            fields.forEach((field) =>
                this.createFrame(
                    field,
                    config.ranges[field.range][field.index + 1],
                ),
            );
        } else {
            this.generatedFrames = {};
            config.ranges.forEach((range) => {
                range.forEach((field) =>
                    this.createFrame(
                        field,
                        config.ranges[field.range][field.index + 1],
                    ),
                );
            });
        }
    }

    private createFrame(field: G.Field, nextField?: G.Field) {
        let propertyName: G.PropertyName;

        for (propertyName in field.shadows) {
            const fieldProperty = field.shadows[propertyName];
            const nextPercent = nextField?.offsetFrame ?? 101;

            if (fieldProperty) {
                if (fieldProperty.fillAllFrames) {
                    const length = nextPercent - field.offsetFrame;

                    for (let i = 0; i < length; ++i) {
                        const percent = field.offsetFrame + i;

                        if (fieldProperty.enabled) {
                            this.setFrame(propertyName, field, percent);
                        } else {
                            this.setEmptyFrame(
                                percent,
                                propertyName,
                                field.range,
                            );
                        }
                    }
                } else {
                    for (let i = field.offsetFrame; i < nextPercent; ++i) {
                        this.setEmptyFrame(i, propertyName, field.range);
                    }
                    if (fieldProperty.enabled) {
                        this.setFrame(propertyName, field, field.offsetFrame);
                    } else {
                        this.setEmptyFrame(
                            field.offsetFrame,
                            propertyName,
                            field.range,
                        );
                    }
                }
            }
        }
    }

    private setEmptyFrame(
        percent: number,
        propertyName: G.PropertyName,
        range: number,
    ) {
        let frame = this.generatedFrames[percent];

        if (!frame) {
            frame = {};
        }

        if (!frame[propertyName]) {
            frame[propertyName] = [];
        }

        (<string[]>frame[propertyName])[range] = "";
        this.generatedFrames[percent] = frame;
    }

    private setFrame(
        propertyName: G.PropertyName,
        field: G.Field,
        percent: number,
    ) {
        const property = field.shadows[propertyName];

        if (property) {
            let frame = this.generatedFrames[percent];

            if (!frame) {
                frame = {};
            }

            if (!frame[propertyName]) {
                frame[propertyName] = [];
            }

            (<string[]>frame[propertyName])[field.range] =
                getPropertyData[propertyName](property);
            this.generatedFrames[percent] = frame;
        }
    }

    private injectHeadStyle(keyframes: string) {
        if (!this.styleNode) {
            const head =
                document.head || document.getElementsByTagName("head")[0];
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

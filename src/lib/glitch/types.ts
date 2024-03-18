namespace Glitch {
    export enum PropertyName {
        TextShadow = "text-shadow",
        BoxShadow = "box-shadow",
    }

    export enum Unit {
        Pixel = "px",
        Point = "pt",
        Em = "em",
        Rem = "rem",
    }

    export type Color = {
        hex: string;
        alphaPercent: number;
    };

    export type PropertyBase = {
        enabled: boolean;
        fillAllFrames: boolean;
    };

    export type Shadow = Declarations.TextShadow & Declarations.BoxShadow;

    export type Shadows = {
        [PropertyName.BoxShadow]?: Shadow;
        [PropertyName.TextShadow]?: Shadow;
    };

    export type Field = {
        range: number;
        index: number;
        offsetFrame: number;
        shadows: Shadows;
    };

    export type BaseText = {
        size: number;
        unit: Unit | string;
        color: Color;
        bgColor: Color;
        height: number;
        padding: number;
        borderRadius: number;
        message: string;
    };

    export type Animation = {
        duration: number;
    };

    export type Error = {
        path: string;
        code: string;
        message: string;
    };

    export type Errors = { [key: string]: Error };

    export type Config = {
        onValidated?: (errors: Errors | undefined) => void;
        preventRangesCompute?: boolean;
        controls: boolean;
        text: BaseText;
        animation: Animation;
        ranges: Field[][];
    };

    export type Bindings = {
        message: string;
        textStyle: {
            fontSize: string;
            padding: string;
            height: string;
            backgroundColor: string;
            borderRadius: string;
            color: string;
        } & AnimationStyle;
    };

    export type ContainerStyle = Partial<{
        display: string;
        alignItems: string;
        justifyContent: string;
    }>;

    export type Export = {
        keyframes: string;
        style: Bindings & ContainerStyle;
    };

    export type AnimationStyle = {
        animationName?: string;
        animationDuration?: string;
        animationTimingFunction?: string;
        animationIterationCount?: string;
        animationPlayState?: string;
    };

    export namespace Declarations {
        export type Shadow = {
            color: Color;
            offsetX: number;
            offsetY: number;
            blur: number;
        };

        export type TextShadow = PropertyBase & Shadow;

        export type BoxShadow = PropertyBase &
            Shadow & {
                spread?: number;
            };
    }
}

export default Glitch;

export enum GlitchAnimationProperty {
    TextShadow = 'text-shadow',
    BoxShadow = 'box-shadow',
}

export enum GlitchUnit {
    Pixel = 'px',
    Point = 'pt',
    Em = 'em',
    Rem = 'rem',
}

export type GlitchAnimationPropertyUnion = `${GlitchAnimationProperty}`;

export type GlitchUnitUnion = `${GlitchUnit}`;

export type GlitchColor = {
    hex: string,
    alphaPercent: number
}

export type GlitchShadowField = {
    property?: GlitchAnimationPropertyUnion,
    range: number,
    index: number,
    offsetFrame: number,
    color: GlitchColor,
    offsetX: number,
    offsetY: number,
    blur: number,
    spread: number
}

export type GlitchBaseText = {
    size: number,
    unit: GlitchUnitUnion,
    color: GlitchColor,
    message: string
}

export type GlitchAnimation = {
    property: GlitchAnimationPropertyUnion,
    duration: number,        
}

export type GlitchError = {
    path: string,
    code: string,
    message: string
}

export type GlitchErrors = { [key: string]: GlitchError };

export type GlitchConfig = {
    onValidated?: (errors: GlitchErrors | undefined) => void,
    preventRangesCompute?: boolean,
    text: GlitchBaseText,
    controls?: boolean,
    animation: GlitchAnimation,
    ranges: GlitchShadowField[][],
}

export type GlitchBindings = {
    message: string,
    textStyle: {
        fontSize: string,
        color: string,
        animationDuration?: string,
        animationTimingFunction?: string,
        animationIterationCount?: string,
        animationPlayState?: string
    }
}

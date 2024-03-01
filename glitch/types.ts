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

export type GlitchShadowProperty = {
    enabled: boolean,
    fillAllFrames: boolean,
    color: GlitchColor,
    offsetX: number,
    offsetY: number,
    blur: number,
    spread?: number
}

export type GlitchShadowProperties = {
    [key in GlitchAnimationProperty]: GlitchShadowProperty
}

export type GlitchShadowField = {
    range: number,
    index: number,
    offsetFrame: number,
    properties: GlitchShadowProperties,
}

export type GlitchBaseText = {
    size: number,
    unit: GlitchUnitUnion,
    color: GlitchColor,
    bgColor: GlitchColor,
    height: number,
    padding: number,
    message: string
}

export type GlitchAnimation = {
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
    controls: boolean,
    animation: GlitchAnimation,
    ranges: GlitchShadowField[][],
}

export type GlitchBindings = {
    message: string,
    textStyle: {
        fontSize: string,
        padding: string,
        height: string,
        backgroundColor: string,
        color: string,
    } & AnimationBindings
}

export type AnimationBindings = {
    animationDuration?: string,
    animationTimingFunction?: string,
    animationIterationCount?: string,
    animationPlayState?: string
}

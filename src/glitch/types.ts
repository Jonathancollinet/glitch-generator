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
    [key in GlitchAnimationProperty]?: GlitchShadowProperty
}

export type GlitchShadowField = {
    range: number,
    index: number,
    offsetFrame: number,
    properties: GlitchShadowProperties,
}

export type GlitchBaseText = {
    size: number,
    unit: GlitchUnitUnion | string,
    color: GlitchColor,
    bgColor: GlitchColor,
    height: number,
    padding: number,
    borderRadius: number,
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
    controls: boolean,
    text: GlitchBaseText,
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
        borderRadius: string,
        color: string,
    } & AnimationBindings
}

export type ContainerBindings = Partial<{
    display: string,
    alignItems: string,
    justifyContent: string,
}>

export type GlitchExport = {
    keyframes: string,
    style: GlitchBindings & ContainerBindings
}

export type AnimationBindings = {
    animationName?: string,
    animationDuration?: string,
    animationTimingFunction?: string,
    animationIterationCount?: string,
    animationPlayState?: string
}
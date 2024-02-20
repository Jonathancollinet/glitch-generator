export enum GlitchAnimationProperty {
    TextShadow = 'text-shadow'
}

export enum GlitchUnit {
    Pixel = 'px',
    Percent = '%',
    Em = 'em',
    Rem = 'rem'
}

export type GlitchAnimationPropertyValues = `${GlitchAnimationProperty}`;

export type GlitchUnitValues = `${GlitchUnit}`;

export type GlitchColor = {
    hex: string,
    alphaPercent: number
}

export type GlitchTextShadowField = {
    range: number,
    index: number,
    startPercent: number,
    endPercent: number,
    color: GlitchColor,
    offsetX: number,
    offsetY: number,
    blur: number
}

export type GlitchBaseText = {
    size: number,
    unit: GlitchUnitValues,
    color: GlitchColor,
    message: string
}

export type GlitchAnimation = {
    property: GlitchAnimationPropertyValues,
    duration: number,        
}

export type GlitchError = {
    property: string,
    code: string,
    message: string
}

export type _GlitchConfig = {
    onErrors?: (errors: GlitchError[]) => void,
    text: GlitchBaseText,
    animation: GlitchAnimation,
    ranges: GlitchTextShadowField[][]
}

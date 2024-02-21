export enum GlitchAnimationProperty {
    TextShadow = 'text-shadow'
}

export enum GlitchUnit {
    Pixel = 'px',
    Percent = '%',
    Em = 'em',
    Rem = 'rem'
}

export enum FieldActions {
    Add = 'add',
    Remove = 'remove',
    Update = 'update'
}

export type FieldActionsValues = `${FieldActions}`;

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
    path: string,
    code: string,
    message: string
}

export type GlitchConfig = {
    onErrors?: (errors: GlitchError[]) => void,
    preventFieldValidation?: boolean,
    text: GlitchBaseText,
    animation: GlitchAnimation,
    ranges: GlitchTextShadowField[][]
}

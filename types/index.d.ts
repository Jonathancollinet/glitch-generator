/*
    enums unions
*/

declare type IconsValues = `${import('./enums').Icons}`;
declare type UrlsValues = `${import('./enums').Urls}`

/* 
    navigation
    ----------------
*/

declare interface NavigationItem {
    label: string;
    to: UrlsValues;
}

type GlitchError = import('~/plugins/glitch/types').GlitchError;

declare type FrontGlitchError = Partial<{
    text: {
        size: GlitchError,
        unit: GlitchError,
        color: GlitchError,
        message: GlitchError
    },
    animation: {
        property: GlitchError,
        duration: GlitchError
    },
    ranges: {
        range: GlitchError,
        index: GlitchError,
        startPercent: GlitchError,
        endPercent: GlitchError,
        color: {
            hex: GlitchError,
            alphaPercent: GlitchError
        },
        offsetX: GlitchError,
        offsetY: GlitchError,
        blur: GlitchError
    }[][]
}>

declare type DOMGlitchField = {
    range: number,
    index: number,
    startPercent: string,
    endPercent: string,
    color: {
        hex: string,
        alphaPercent: string
    }
    offsetX: string,
    offsetY: string,
    blur: string
}

declare interface DOMGlitchConfig {
    text: {
        size: string,
        unit: string,
        color: string,
        message: string
    },
    animation: {
        property: string,
        duration: string
    },
    ranges: DOMGlitchField[][]
}
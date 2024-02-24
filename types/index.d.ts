/*
    enums unions
*/

declare type IconsUnion = `${import('./enums').Icons}`;
declare type UrlsUnion = `${import('./enums').Urls}`

/* 
    navigation
    ----------------
*/

declare interface NavigationItem {
    label: string;
    to: UrlsUnion;
}

declare type DOMGlitchField = {
    range: number,
    index: number,
    offsetFrame: string,
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
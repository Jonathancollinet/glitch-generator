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
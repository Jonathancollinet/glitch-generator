/*
    enums unions
    ----------------
*/

declare type IconsUnion = `${import('./enums').Icons}`;
declare type UrlsUnion = `${import('./enums').Urls}`;
declare type ModesUnion = `${import('./enums').Modes}`;

/* 
    navigation
    ----------------
*/

declare type NavigationItem = {
    label: string,
    to: UrlsUnion
}

/*
    UI
    ----------------
*/

declare type Tabs = {
    [key: string]: {
        label: string,
        icon?: IconsUnion
    }
}

declare type ColorHistory = {
    r: number,
    g: number,
    b: number,
    a: number
}
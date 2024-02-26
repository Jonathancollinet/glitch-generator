/*
    enums unions
    ----------------
*/

declare type IconsUnion = `${import('./enums').Icons}`;
declare type UrlsUnion = `${import('./enums').Urls}`

/* 
    navigation
    ----------------
*/

declare type NavigationItem = {
    label: string;
    to: UrlsUnion;
}

/*
    UI
    ----------------
*/

declare type Tabs = {
    [key: string]: {
        label: string;
        icon?: IconsUnion;
    }
}
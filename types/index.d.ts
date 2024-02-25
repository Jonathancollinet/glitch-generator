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
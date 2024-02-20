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
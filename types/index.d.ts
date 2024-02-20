/*
    enums unions
*/

declare type IconsValues = `${import('./enums').Icons}`;
declare type UrlsValues = `${import('./enums').Urls}`
declare type ExternalUrlsValues = `${import('./enums').ExternalUrls}`

/* 
    navigation
    ----------------
*/

declare interface NavigationItem {
    label: string;
    to: UrlsValues;
}
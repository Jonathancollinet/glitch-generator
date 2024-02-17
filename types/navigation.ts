export enum ELinkLabels {
    Home = 'Home',
    Editor = 'Editor'
}

export enum EUrls {
    Home = '/',
    Editor = '/editor'
}

export enum EExternalUrls {
    Github = 'https://github.com'
}

export interface INavigationItem {
    label: ELinkLabels;
    to: EUrls;
}

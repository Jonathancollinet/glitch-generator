export enum EUrls {
    Home = '/',
    Editor = '/editor'
}

export enum EExternalUrls {
    Github = 'https://github.com'
}

export interface INavigationItem {
    label: string;
    to: EUrls;
}

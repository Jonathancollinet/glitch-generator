import { EUrls, type INavigationItem } from '~/types/navigation';

export const navigationItems: INavigationItem[] = [
    {
        label: 'navigation.links.home',
        to: EUrls.Home
    },
    {
        label: 'navigation.links.editor',
        to: EUrls.Editor
    }
];

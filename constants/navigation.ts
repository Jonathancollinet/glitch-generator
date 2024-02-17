import { ELinkLabels, EUrls, type INavigationItem } from '~/types/navigation';

export const navigationItems: INavigationItem[] = [
    {
        label: ELinkLabels.Home,
        to: EUrls.Home
    },
    {
        label: ELinkLabels.Editor,
        to: EUrls.Editor
    }
];
import { EUrls, type INavigationItem } from '~/types/navigation';

export const useNavigationItems = (t: any) => {
    return useState<INavigationItem[]>("navigationItems", () => [
        {
            label: t('navigation.links.home'),
            to: EUrls.Home
        },
        {
            label: t('navigation.links.editor'),
            to: EUrls.Editor
        }
    ]);
}

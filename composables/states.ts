import { navigationItems } from './constants';

export const useNavigationItems = () => {
    return useState<NavigationItem[]>("navigationItems", () => navigationItems);
}
import { type INavigationItem } from '~/types/navigation';
import { navigationItems } from './constants';

export const useNavigationItems = () => {
    return useState<INavigationItem[]>("navigationItems", () => navigationItems);
}
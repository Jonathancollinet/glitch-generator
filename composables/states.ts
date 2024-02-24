export const useNavigationItems = () => {
    return useState<NavigationItem[]>("navigationItems", () => navigationItems);
}
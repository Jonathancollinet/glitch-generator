export const useNavigationItems = () => {
    return useState<NavigationItem[]>("navigationItems", () => navigationItems);
}

export const useAllColors = () => {
    return useState<ColorHistory[]>("allColors", () => allColors);    
}

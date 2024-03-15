export const useAllColors = () => {
    return useState<ColorHistory[]>("allColors", () => allColors);    
}

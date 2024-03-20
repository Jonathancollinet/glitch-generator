export const useTranslatedSeoMeta = (pageName: string): Parameters<typeof useServerSeoMeta>[0] => {
    const { t } = useI18n();
    const seoGlobalPath = "seo";
    const seoPagePath = `pages.${pageName}.seo`;
    const title = t(getSeoPath(seoPagePath, "title"));
    const description = t(getSeoPath(seoGlobalPath, "description"));
    const type = "website";
    const pageUrl = pageName === "home" ? "" : pageName;
    const url = `https://glitch-generator.com/${pageUrl}`;
    const image = "https://glitch-generator.com/ogImage.png";

    function getSeoPath(path: string, property: string) {
        return `${path}.${property}`;
    }

    return {
        creator: "Jonathan COLLINET",
        applicationName: "Glitch Generator",
        colorScheme: "light dark",

        title,
        description,

        ogType: type,
        ogTitle: title,
        ogDescription: description,
        ogUrl: url,
        ogImage: image,
    };
};

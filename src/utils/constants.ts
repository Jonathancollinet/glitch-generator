import { HelpChapter, Urls } from "~/types/enums";

export const version = process.env.PACKAGE_VERSION;

export const navigationItems: NavigationItem[] = [
    {
        label: "navigation.links.home",
        to: Urls.Home,
    },
    {
        label: "navigation.links.editor",
        to: Urls.Editor,
    },
    {
        label: "navigation.links.help",
        to: Urls.Help,
    },
];

export const chapters: Chapter[] = [
    {
        name: HelpChapter.Tool,
    },
    {
        name: HelpChapter.Input,
    },
    {
        name: HelpChapter.Keyframes,
    },
    {
        name: HelpChapter.Export,
    },
    {
        name: HelpChapter.Import,
    },
    {
        name: HelpChapter.Presets,
    },
];

export const allColors: any[] = [];

export const rangeHeight = 32;

export const timelineFPS = 144;

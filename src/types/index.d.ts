declare type IconsUnion = `${import("./enums").Icons}`;
declare type UrlsUnion = `${import("./enums").Urls}`;
declare type ModesUnion = `${import("./enums").Modes}`;
declare type HelpChapterUnion = `${import("./enums").HelpChapter}`;

declare type NavigationItem = {
    label: string;
    to: UrlsUnion;
};

declare type Tabs = {
    [key: string]: {
        label: string;
        icon?: IconsUnion;
    };
};

declare type ColorHistory = {
    r: number;
    g: number;
    b: number;
    a: number;
};

declare type Chapter = {
    name: HelpChapter;
};

declare interface EditorDisplayedTextData extends Ref<InstanceType<typeof EditorDisplayedText>> {
    glitchedEl: HTMLElement | null;
}

declare interface EditorPresetsData extends Ref<InstanceType<typeof EditorPresets>> {
    savePreset: () => void;
}

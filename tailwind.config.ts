import type { Config } from "tailwindcss";
import twColors from "tailwindcss/colors";

const customColors = {
    red: {
        "50": "#fff1f1",
        "100": "#ffe4e4",
        "200": "#fecdcf",
        "300": "#fca5a9",
        "400": "#fa727b",
        "500": "#f45b69",
        "600": "#df1f3a",
        "700": "#bc1430",
        "800": "#9e132f",
        "900": "#87142e",
        "950": "#4b0613",
    },
    purple: {
        "50": "#f4f3ff",
        "100": "#ebe9fe",
        "200": "#d8d5ff",
        "300": "#bcb3ff",
        "400": "#9c89fc",
        "500": "#724cf9",
        "600": "#6b36f1",
        "700": "#5c24dd",
        "800": "#4d1eb9",
        "900": "#401a98",
        "950": "#250e67",
        "1000": "#080128",
    },
};

const colors = {
    transparent: twColors.transparent,
    primary: customColors.purple, // primary
    neutral: twColors.neutral, // white/gray/black
    green: twColors.green, // success
    red: customColors.red, // error
};

const themeOverrides: Partial<Config> = {
    colors,
    extend: {
        spacing: {
            header: "4rem",
        },
    },
};

export default <Partial<Config>>{
    darkMode: "class",
    theme: themeOverrides,
    configViewer: themeOverrides,
    content: ["src/ui/**/*.{js,ts}"],
};

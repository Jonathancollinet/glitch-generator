import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors';

const customColors = {
    purple: {
        '50': '#f4f3ff',
        '100': '#ebe9fe',
        '200': '#d8d5ff',
        '300': '#bcb3ff',
        '400': '#9c89fc',
        '500': '#724cf9',
        '600': '#6b36f1',
        '700': '#5c24dd',
        '800': '#4d1eb9',
        '900': '#401a98',
        '950': '#250e67',
        '1000': "#080128"
    }
}

const colors = {
    transparent: twColors.transparent,
    primary: customColors.purple,       // primary
    neutral: twColors.neutral,          // white/gray/black
    green: twColors.green,              // success
    red: twColors.red,                  // error
}

const themeOverrides: Partial<Config> = {
    colors,
    extend: {
        spacing: {
            header: '4rem'
        }
    }
}

export default <Partial<Config>>{
    darkMode: 'class',
    theme: themeOverrides,
    configViewer: themeOverrides,
    content: [
        "src/componentsVariants/**/*.{js,ts}"
    ]
}
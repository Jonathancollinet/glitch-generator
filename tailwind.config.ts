import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors';

const customColors = {
    blue: {
        '50': '#f2f5fc',
        '100': '#e1e8f8',
        '200': '#cad7f3',
        '300': '#a6beea',
        '400': '#7c9dde',
        '500': '#5d7dd4',
        '600': '#4962c7',
        '700': '#3f51b6',
        '800': '#384495',
        '900': '#323b76',
        '950': '#222749',
    }
}

const colors = {
    transparent: twColors.transparent,
    blue: customColors.blue,    // primary
    neutral: twColors.neutral,  // white/gray/black
    green: twColors.green,      // success
    red: twColors.red,          // error
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
        "./componentsVariants/**/*.{js,ts}"
    ]
}
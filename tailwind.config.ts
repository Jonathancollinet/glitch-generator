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
    white:  twColors.white,
    black:  twColors.black,

    blue:   customColors.blue, // primary
    gray:   twColors.gray, // neutral
    green:  twColors.green, // success
    red:    twColors.red, // error
}

const theme = {
    colors
}

export default <Partial<Config>>{
    darkMode: 'class',
    theme: theme,
    configViewer: theme
}
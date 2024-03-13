export function toggleDarkMode() {
    const colorMode = useColorMode();
    const isDark = colorMode.value === 'dark';

    if (isDark) {
        colorMode.preference = 'light';
    } else {
        colorMode.preference = 'dark';
    }
}

export function isNotFalsy(value: any) {
    return value !== null && value !== undefined && value !== '' && !Number.isNaN(value)
}

export function deepCopy<Container>(obj: Container): Container {
    return JSON.parse(JSON.stringify(obj));
}

export function hideGhost(e: DragEvent | TouchEvent) {
    if (e instanceof DragEvent) {
        e.dataTransfer?.setDragImage(new Image(), 0, 0);
    }
}

export function getStyleSheet(css: string) {
    const style = document.createElement('style');
    let sheet: CSSStyleSheet | null = null;

    style.textContent = css;
    document.head.appendChild(style);
    sheet = style.sheet;
    style.remove();

    return sheet;
}

export function hexToRGB(hex: string, alpha: number = 100) {
    hex = hex.replace('#', '');

    const r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    if (alpha === 100) {
        return `rgb(${r} ${g} ${b})`;
    }
    return `rgb(${r} ${g} ${b} / ${alpha}%)`;
}

export function hexToRGBObject(hex: string, alpha: number = 100) {
    hex = hex.replace('#', '');

    const r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return {
        r,
        g,
        b,
        a: alpha / 100
    };
}

export function RGBToHex(r: number, g: number, b: number) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
}

export function reverseColor(hex: string) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function reverseNumber(num: number): number {
    if (num > 0) {
        return -Math.abs(num);
    }
    if (num < 0) {
        return Math.abs(num);
    }

    return 0;
}

function padZero(str: string, len: number = 2) {
    return (new Array(len).join('0') + str).slice(-len);
}
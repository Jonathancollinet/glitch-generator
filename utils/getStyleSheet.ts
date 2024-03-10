export default function getStyleSheet(css: string) {
    const style = document.createElement('style');
    let sheet: CSSStyleSheet | null = null;

    style.textContent = css;
    document.head.appendChild(style);
    sheet = style.sheet;
    style.remove();

    return sheet;
}
export default () => {
    const colorMode = useColorMode();
    const isDark = colorMode.preference === 'dark';

    if (isDark) {
        colorMode.preference = 'light';
    } else {
        colorMode.preference = 'dark';
    }
}

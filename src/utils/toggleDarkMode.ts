export default () => {
    const colorMode = useColorMode();
    const isDark = colorMode.value === 'dark';

    if (isDark) {
        colorMode.preference = 'light';
    } else {
        colorMode.preference = 'dark';
    }
}

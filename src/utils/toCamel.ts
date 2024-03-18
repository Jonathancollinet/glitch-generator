export default (str: string) => {
    return str.replace(/-./g, (x) => x[1].toUpperCase());
};

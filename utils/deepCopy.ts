export default function deepCopy<Container>(obj: Container): Container {
    return JSON.parse(JSON.stringify(obj));
}

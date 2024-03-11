export default function reverseNumber(num: number): number {
    if (num > 0) {
        return -Math.abs(num);
    }
    if (num < 0) {
        return Math.abs(num);
    }

    return 0;
}
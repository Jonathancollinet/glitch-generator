import { cva, type VariantProps } from "class-variance-authority";

export type TextVariantsProps = VariantProps<typeof TextVariants>;

export const TextVariants = cva(
    [
        // global
        "text-neutral-600",
        "dark:text-neutral-300",
    ],
    {
        variants: {
            variant: {
                default: [],
                div: [],
                p: ["mb-2", "last:mb-0"],
                label: ["block", "select-none", "text-[inherit]", "dark:text-[inherit]"],
            },
            size: {
                default: [],
                big: ["text-4xl"],
                xs: ["text-xs"],
            },
            color: {
                default: [],
                black: ["text-[inherit]", "dark:text-[inherit]"],
                danger: ["text-red-500 hover:text-red-400", "dark:text-red-500 dark:hover:text-red-400"],
            },
        },
    },
);

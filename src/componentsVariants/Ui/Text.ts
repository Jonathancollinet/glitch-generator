import {cva, type VariantProps} from 'class-variance-authority';

export type TextVariantsProps = VariantProps<typeof TextVariants>;

export const TextVariants = cva(
    [
        // global
        'transition-colors',
        'text-neutral-600',
        'dark:text-neutral-300',

        // p
        "data-[tag=p]:mb-2",
        "last:data-[tag=p]:mb-0",

        // label
        "data-[tag=label]:block",
        "data-[tag=label]:select-none",

        // colors
        "data-[color=black]:text-[inherit]",
        "dark:data-[color=black]:text-[inherit]",
        "data-[color=danger]:text-red-500 data-[color=danger]:hover:text-red-400",
        "dark:data-[color=danger]:text-red-500 dark:data-[color=danger]:hover:text-red-400",

        // sizes
        "data-[size=big]:text-4xl",
        "data-[size=xs]:text-xs",
    ]
);

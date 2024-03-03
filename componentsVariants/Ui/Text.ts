import {cva, type VariantProps} from 'class-variance-authority';

export type TextVariantsProps = VariantProps<typeof TextVariants>;

export const TextVariants = cva(
    [
        // global
        "text-neutral-600 transition-[color]",
        "dark:text-neutral-200",

        // data-tag="p"
        "data-[tag=p]:mb-4",
        "last:data-[tag=p]:mb-0",

        // data-tag="span"
    ]
);

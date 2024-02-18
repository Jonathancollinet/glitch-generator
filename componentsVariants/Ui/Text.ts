import {cva, type VariantProps} from 'class-variance-authority';

export type TextVariantsProps = VariantProps<typeof TextVariants>;

export const TextVariants = cva(
    [
        // global
        "text-neutral-600 transition-colors",
        "dark:text-neutral-200",

        // data-tag="p"
        "data-[tag=p]:mb-4",

        // data-tag="span"
    ]
);

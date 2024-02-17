import {cva, type VariantProps} from 'class-variance-authority';

export type LinkVariantsProps = VariantProps<typeof LinkVariants>;

export const LinkVariants = cva(
    [
        "transition-colors",
        "font-medium text-neutral-400 [&.router-link-active]:text-neutral-800",
        "dark:text-neutral-400 dark:[&.router-link-active]:text-neutral-50"
    ],
    {
        variants: {
            variant: {
                default: []
            },
        },
        defaultVariants: {
            variant: 'default',
        }
    }
);

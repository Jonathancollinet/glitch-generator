import {cva, type VariantProps} from 'class-variance-authority';

export type LinkVariantsProps = VariantProps<typeof LinkVariants>;

export const LinkVariants = cva(
    [
        "transition-[color]",
        "cursor-pointer"
    ],
    {
        variants: {
            variant: {
                default: [
                    "font-bold text-neutral-400 [&.router-link-active]:text-primary-600",
                    "hover:text-neutral-500",
                    "dark:hover:text-primary-200 dark:[&.router-link-active]:text-primary-400 dark:text-neutral-50"            
                ],
                icon: [

                ]
            },
        },
        defaultVariants: {
            variant: 'default',
        }
    }
);

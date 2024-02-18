import {cva, type VariantProps} from 'class-variance-authority';

export type LinkVariantsProps = VariantProps<typeof LinkVariants>;

export const LinkVariants = cva(
    [
        "transition-colors",
    ],
    {
        variants: {
            variant: {
                default: [
                    "font-medium text-neutral-400 [&.router-link-active]:text-neutral-800",
                    "hover:text-neutral-600",
                    "dark:[&.router-link-active]:text-neutral-50"            
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

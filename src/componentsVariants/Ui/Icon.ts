import {cva, type VariantProps} from 'class-variance-authority';

export type IconVariantsProps = VariantProps<typeof IconVariants>;

export const IconVariants = cva(
    [
        "transition-all"
    ],
    {
        variants: {
            variant: {
                default: [
                    'stroke-2 stroke-neutral-800 fill-transparent',
                    'hover:stroke-primary-600',

                    'dark:stroke-neutral-50',
                    'dark:hover:stroke-primary-400',
                ],
                filled: [
                    "fill-neutral-800",
                    'hover:fill-primary-600',

                    "dark:fill-neutral-50",
                    "dark:hover:fill-primary-400",
                ]
            },
            size: {
                default: "w-5 h-5",
                sm: "w-4 h-4",
                lg: "w-8 h-8",
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }
);

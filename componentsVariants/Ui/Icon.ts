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
                    'stroke-2 stroke-blue-400 fill-transparent',
                    'hover:stroke-blue-600',

                    'dark:stroke-neutral-50',
                    'dark:hover:stroke-neutral-200',
                ],
                filled: [
                    "stroke-none",
                    'hover:fill-blue-600',
                    "fill-blue-400",

                    "dark:fill-neutral-50",
                    "dark:hover:fill-neutral-200",
                ]
            },
            size: {
                default: "w-6 h-6",
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

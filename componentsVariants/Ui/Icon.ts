import {cva, type VariantProps} from 'class-variance-authority';

export type IconVariantsProps = VariantProps<typeof IconVariants>;

export const IconVariants = cva(
    [
        'stroke-2 stroke-blue-400 fill-transparent',
        'dark:stroke-blue-100'
    ],
    {
        variants: {
            variant: {
                default: [
                    "w-6 h-6"
                ]
            },
            size: {
                default: ''
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }
);

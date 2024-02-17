import {cva, type VariantProps} from 'class-variance-authority';

export type IconVariantsProps = VariantProps<typeof IconVariants>;

export const IconVariants = cva(
    [
    ],
    {
        variants: {
            variant: {
                default: []
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

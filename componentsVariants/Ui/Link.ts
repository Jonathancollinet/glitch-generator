import {cva, type VariantProps} from 'class-variance-authority';

export type LinkVariantsProps = VariantProps<typeof LinkVariants>;

export const LinkVariants = cva(
    [
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

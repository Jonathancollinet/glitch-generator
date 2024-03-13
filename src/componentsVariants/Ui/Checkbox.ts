import {cva, type VariantProps} from 'class-variance-authority';

export type CheckboxVariantsProps = VariantProps<typeof CheckboxVariants>;

export const CheckboxVariants = cva(
    [
        'flex items-center cursor-pointer *:cursor-pointer select-none',
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

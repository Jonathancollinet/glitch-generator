import {cva, type VariantProps} from 'class-variance-authority';

export type InputVariantsProps = VariantProps<typeof InputVariants>;

export const InputVariants = cva(
    [
    ],
    {
        variants: {
            variant: {
                default: []
            },
            alignment: {
                default: '',
                left: 'text-left',
                center: 'text-center',
                right: 'text-right'
            },
            size: {
                default: 'w-full',
                medium: 'w-36'
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }
);

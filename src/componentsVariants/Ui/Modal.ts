import {cva, type VariantProps} from 'class-variance-authority';

export type ModalVariantsProps = VariantProps<typeof ModalVariants>;

export const ModalVariants = cva(
    [
        'flex justify-center items-center'
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

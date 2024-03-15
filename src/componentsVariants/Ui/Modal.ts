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

export const ContentVariants = cva(
    [
        'max-w-xl p-6 bg-primary-50',
        'border-2 border-neutral-700',
        'dark:bg-primary-950 dark:border-neutral-300'
    ]
)
import {cva, type VariantProps} from 'class-variance-authority';

export type InputVariantsProps = VariantProps<typeof InputVariants>;

export const InputVariants = cva(
    [
        'px-1 rounded-md',
        'transition-colors'
    ],
    {
        variants: {
            variant: {
                default: [
                    "bg-primary-200 text-neutral-900 placeholder-neutral-500",
                    "dark:bg-primary-200",
                ]
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

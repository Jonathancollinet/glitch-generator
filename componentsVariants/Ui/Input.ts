import {cva, type VariantProps} from 'class-variance-authority';

export type InputVariantsProps = VariantProps<typeof InputVariants>;

export const InputVariants = cva(
    [
    ],
    {
        variants: {
            variant: {
                default: [
                    "bg-primary-100 text-neutral-900 placeholder-neutral-500",
                    "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-400",
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

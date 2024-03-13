import {cva, type VariantProps} from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof ButtonVariants>;

export const ButtonVariants = cva(
    [
        'inline-flex items-center justify-center',
        'text-base font-medium select-none',
        'space-x-2',
        'disabled:pointer-events-none disabled:opacity-50'
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-primary-500 text-neutral-50 *:stroke-neutral-50',
                    'hover:bg-primary-600 active:bg-primary-700',
                    'disabled:text-primary-700 disabled:bg-primary-200',
                ],
                outline: [
                    'border border-primary-700',
                    'hover:bg-primary-50 active:bg-primary-100',
                    'disabled:bg-transparent',

                    'dark:bg-transparent dark:border-primary-300',
                    'dark:hover:bg-primary-950 dark:active:bg-primary-950'
                ],
                link: [
                    'hover:text-primary-400'
                ],
                icon: [
                ]
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3 text-sm',
                lg: 'h-11 px-8 text-lg',
                icon: 'h-6 w-6',
                link: 'text-sm'
            },
            color: {
                default: '',
                danger: [
                    'text-red-500 hover:text-red-400',
                    'dark:text-red-500 dark:hover:text-red-400'
                ],
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            color: 'default'
        },
    },
);

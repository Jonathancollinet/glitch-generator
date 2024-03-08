import {cva, type VariantProps} from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof ButtonVariants>;

export const ButtonVariants = cva(
    [
        'inline-flex items-center justify-center rounded-md',
        'text-base font-medium select-none',
        'disabled:pointer-events-none disabled:opacity-50'
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-primary-500 text-neutral-50 *:stroke-neutral-50',
                    'hover:bg-primary-600 active:bg-primary-700',
                    'disabled:text-primary-700 disabled:bg-primary-200',

                    // 'dark:bg-primary-400',
                    // 'dark:hover:bg-primary-300 dark:active:bg-primary-500',
                    // 'dark:disabled:bg-primary-800 dark:disabled:text-primary-100'
                ],
                outline: [
                    'border border-primary-700 text-primary-700',
                    'hover:bg-primary-50 active:bg-primary-100',
                    'disabled:bg-transparent',

                    'dark:bg-transparent dark:text-primary-300 dark:border-primary-300',
                    'dark:hover:bg-primary-950 dark:active:bg-primary-900'
                ],
                ghost: [
                    'text-neutral-50 bg-primary-200',
                    'hover:bg-primary-300 active:bg-primary-300',
                    'disabled:text-primary-200 disabled:bg-transparent',

                    'dark:hover:bg-primary-950 dark:active:bg-primary-900'
                ],
                link: [
                    'hover:text-primary-500'
                ],
                icon: [
                    "rounded-tl-md rounded-br-md"
                ]
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-sm px-3 text-sm',
                lg: 'h-11 rounded-lg px-8 text-lg',
                icon: 'h-6 w-6',
                link: 'text-sm'
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

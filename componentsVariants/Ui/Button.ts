import {cva, type VariantProps} from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof ButtonVariants>;

export const ButtonVariants = cva(
    [
        'inline-flex items-center justify-center rounded-md',
        'text-base font-medium select-none',
        'transition-colors',
        'disabled:pointer-events-none disabled:opacity-50'
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-blue-500 text-neutral-50',
                    'hover:bg-blue-600 active:bg-blue-700',
                    'disabled:text-blue-700 disabled:bg-blue-200',

                    'dark:bg-blue-400 dark:text-blue-950',
                    'dark:hover:bg-blue-300 dark:active:bg-blue-500',
                    'dark:disabled:bg-blue-800 dark:disabled:text-blue-100'
                ],
                outline: [
                    'border border-blue-700 text-blue-700',
                    'hover:bg-blue-50 active:bg-blue-100',
                    'disabled:bg-transparent',

                    'dark:bg-transparent dark:text-blue-300 dark:border-blue-300',
                    'dark:hover:bg-blue-950 dark:active:bg-blue-900'
                ],
                icon: [
                    
                ]
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-sm px-3 text-sm',
                lg: 'h-11 rounded-lg px-8 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

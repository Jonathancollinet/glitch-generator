import {cva, type VariantProps} from "class-variance-authority";

export {default as Button} from './Button.vue';

export const ButtonVariants = cva(
    [
        'inline-flex items-center justify-center rounded-md font-medium transition-colors select-none',
        'disabled:pointer-events-none disabled:opacity-50'
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-blue-500 text-white',
                    'hover:bg-blue-600 active:bg-blue-700',
                    'disabled:text-blue-700 disabled:bg-blue-200'
                ],
                outline: [
                    'border border-blue-700 text-blue-700',
                    'hover:bg-blue-50 hover:text-accent-foreground',
                    'active:background-blue-100',
                ]
            },
            size: {
                default: 'h-10 px-4 py-2 text-base rounded-md',
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

export interface ButtonVariantsProps extends VariantProps<typeof ButtonVariants> {};
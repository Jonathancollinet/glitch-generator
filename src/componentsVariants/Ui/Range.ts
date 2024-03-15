import {cva, type VariantProps} from 'class-variance-authority';

export type RangeVariantsProps = VariantProps<typeof RangeVariants>;

export const RangeVariants = cva(
    [
        'w-full appearance-none cursor-pointer',
        'bg-transparent',
        'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',

        `[&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:h-3
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:bg-primary-700
        [&::-webkit-slider-thumb]:transition-[background-color]
        [&::-webkit-slider-thumb]:dark:bg-primary-400
        
        [&::-moz-range-thumb]:w-2
        [&::-moz-range-thumb]:h-2
        [&::-moz-range-thumb]:mt-[2px]
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-neutral-700
        [&::-moz-range-thumb]:transition-[background-color]
        
        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-3
        [&::-webkit-slider-runnable-track]:bg-primary-200
        [&::-webkit-slider-runnable-track]:transition-[background-color]
        [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
        
        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-4
        [&::-moz-range-track]:bg-neutral-100
        [&::-moz-range-track]:transition-[background-color]
        [&::-moz-range-track]:hover:bg-neutral-200
        [&::-moz-range-track]:dark:bg-neutral-700`
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

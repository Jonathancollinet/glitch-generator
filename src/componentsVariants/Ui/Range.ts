import {cva, type VariantProps} from 'class-variance-authority';

export type RangeVariantsProps = VariantProps<typeof RangeVariants>;

export const RangeVariants = cva(
    [
        'w-full appearance-none cursor-pointer',
        'bg-transparent',
        'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',

        `[&::-webkit-slider-thumb]:w-2
        [&::-webkit-slider-thumb]:h-2
        [&::-webkit-slider-thumb]:-mt-0
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgb(114,76,249)]
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:transition-colors
        [&::-webkit-slider-thumb]:duration-150
        [&::-webkit-slider-thumb]:ease-in-out
        [&::-webkit-slider-thumb]:dark:bg-neutral-700
        
        [&::-moz-range-thumb]:w-2
        [&::-moz-range-thumb]:h-2
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-primary-600
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:transition-colors
        [&::-moz-range-thumb]:duration-150
        [&::-moz-range-thumb]:ease-in-out
        
        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:bg-neutral-100
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
        
        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:bg-neutral-100
        [&::-moz-range-track]:rounded-full`
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

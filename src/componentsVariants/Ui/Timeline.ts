import {cva, type VariantProps} from 'class-variance-authority';

export type TimelineVariantsProps = VariantProps<typeof TimelineVariants>;

export const TimelineVariants = cva(
    [

        'w-full appearance-none cursor-pointer',
        'bg-transparent',
        'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',

        `[&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:bg-primary-500
        [&::-webkit-slider-thumb]:transition-[background-color]
        [&::-webkit-slider-thumb]:ease-in-out
        [&::-webkit-slider-thumb]:dark:bg-primary-400
        
        [&::-moz-range-thumb]:w-2
        [&::-moz-range-thumb]:h-2
        [&::-moz-range-thumb]:mt-[2px]
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-primary-600
        [&::-moz-range-thumb]:transition-[background-color]
        [&::-moz-range-thumb]:ease-in-out
        
        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-4
        [&::-webkit-slider-runnable-track]:shadow-none
        [&::-webkit-slider-runnable-track]:dark:shadow-none
        [&::-webkit-slider-runnable-track]:bg-neutral-200
        [&::-webkit-slider-runnable-track]:transition-[background-color]
        [&::-webkit-slider-runnable-track]:hover:bg-neutral-200
        [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
        [&::-webkit-slider-runnable-track]:dark:hover:bg-neutral-700
        
        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-4
        [&::-moz-range-track]:bg-neutral-100
        [&::-moz-range-track]:transition-[background-color]
        [&::-moz-range-track]:hover:bg-neutral-200
        [&::-moz-range-track]:dark:bg-neutral-700
        [&::-moz-range-track]:dark:hover:bg-neutral-700`
    ]
);

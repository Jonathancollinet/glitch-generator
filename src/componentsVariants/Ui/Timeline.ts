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
        [&::-webkit-slider-thumb]:dark:bg-primary-500
        
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:rounded-none
        [&::-moz-range-thumb]:border-none
        [&::-moz-range-thumb]:bg-primary-500
        [&::-moz-range-thumb]:transition-[background-color]
        [&::-moz-range-thumb]:dark:bg-primary-500
        
        [&::-webkit-slider-runnable-track]:w-full
        [&::-webkit-slider-runnable-track]:h-4
        [&::-webkit-slider-runnable-track]:bg-neutral-200
        [&::-webkit-slider-runnable-track]:transition-[background-color]
        [&::-webkit-slider-runnable-track]:dark:bg-neutral-700
        
        [&::-moz-range-track]:w-full
        [&::-moz-range-track]:h-4
        [&::-moz-range-track]:bg-primary-200
        [&::-moz-range-track]:transition-[background-color]
        [&::-moz-range-track]:dark:bg-neutral-700`
    ]
);

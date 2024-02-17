import {cva, type VariantProps} from 'class-variance-authority';

export type HeadingVariantsProps = VariantProps<typeof HeadingVariants>;

export const HeadingVariants = cva(
    [
        'font-bold text-neutral-900 transition-colors'
    ],
    {
        variants: {
            variant: {
                h1: 'text-4xl mb-6 mt-2',
                h2: 'text-3xl mb-6 mt-2',
                h3: 'text-2xl mb-4 mt-2'
            }
        },
        defaultVariants: {
            variant: 'h1'
        }
    }
);

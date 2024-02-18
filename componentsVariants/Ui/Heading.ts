import {cva, type VariantProps} from 'class-variance-authority';

export type HeadingVariantsProps = VariantProps<typeof HeadingVariants>;

export const HeadingVariants = cva(
    [
        'font-bold'
    ],
    {
        variants: {
            variant: {
                h1: 'text-4xl mb-6 mt-4',
                h2: 'text-3xl mb-6 mt-4',
                h3: 'text-2xl mb-4 mt-4'
            }
        },
        defaultVariants: {
            variant: 'h1'
        }
    }
);

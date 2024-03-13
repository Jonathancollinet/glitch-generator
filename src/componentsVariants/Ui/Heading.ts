import {cva, type VariantProps} from 'class-variance-authority';

export type HeadingVariantsProps = VariantProps<typeof HeadingVariants>;

export const HeadingVariants = cva(
    [
        'font-bold'
    ],
    {
        variants: {
            variant: {
                h1: 'text-4xl mb-4 mt-4',
                h2: 'text-3xl mb-3 mt-4',
                h3: 'text-2xl mb-2 mt-4',
                h4: 'text-xl mb-1 mt-4',
                h5: 'text-lg mb-1 mt-4',
                h6: 'text-base mb-1 mt-4',
            }
        },
        defaultVariants: {
            variant: 'h1'
        }
    }
);

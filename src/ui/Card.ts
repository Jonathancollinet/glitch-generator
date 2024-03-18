import { cva, type VariantProps } from "class-variance-authority";

export type CardVariantsProps = VariantProps<typeof CardVariants>;

export const CardVariants = cva(["mb-4 last:mb-0 transition-[background-color]"], {
    variants: {
        variant: {
            default: [],
        },
        size: {
            default: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

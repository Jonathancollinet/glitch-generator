import { cva, type VariantProps } from "class-variance-authority";

export type SelectVariantsProps = VariantProps<typeof SelectVariants>;

export const SelectVariants = cva(
    ["outline-none cursor-pointer", "bg-transparent select-none", "border-b-2 border-r-2", "dark:ring-primary-50"],
    {
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
    },
);

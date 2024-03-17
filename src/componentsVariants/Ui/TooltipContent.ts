import { cva, type VariantProps } from "class-variance-authority";

export type TooltipContentVariantsProps = VariantProps<
    typeof TooltipContentVariants
>;

export const TooltipContentVariants = cva(
    [
        "absolute z-30 inline-flex flex-col p-2 transition-[background-color] select-none",
        "border-2 border-neutral-800",
        "bg-primary-50",
        "space-y-1",

        "dark:bg-neutral-800",
        "dark:border-neutral-200",
    ],
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

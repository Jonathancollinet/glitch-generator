import { cva, type VariantProps } from "class-variance-authority";

export type InputVariantsProps = VariantProps<typeof InputVariants>;

export const InputVariants = cva(
    ["outline-none", "px-1", "transition-[background-color]"],
    {
        variants: {
            variant: {
                default: [
                    "bg-primary-200 placeholder-neutral-500 border-2",
                    "dark:bg-neutral-700",
                ],
            },
            alignment: {
                default: "",
                left: "text-left",
                center: "text-center",
                right: "text-right",
            },
            size: {
                default: "w-full",
                medium: "w-36",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

import { cva, type VariantProps } from "class-variance-authority";

export type CheckboxVariantsProps = VariantProps<typeof CheckboxVariants>;

export const CheckboxVariants = cva(["flex items-center cursor-pointer *:cursor-pointer select-none"], {
    variants: {
        variant: {
            default: [],
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export const CheckVariants = cva(
    ["h-full", "w-full", "bg-primary-600", "group-hover/fg:bg-primary-500", "group-hover/fg:dark:bg-primary-700"],
    {
        variants: {
            variant: {
                default: [],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

import { cva, type VariantProps } from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof ButtonVariants>;

export const ButtonVariants = cva(
    [
        "inline-flex items-center justify-center",
        "text-base font-medium select-none",
        "space-x-2",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default: [
                    "border-2 border-neutral-900",
                    "bg-primary-500 text-neutral-50 *:stroke-neutral-50",
                    "hover:bg-primary-600 active:bg-primary-700",
                    "dark:border-neutral-50",
                    "dark:bg-primary-700 hover:dark:bg-primary-800 active:dark:bg-primary-900",
                    "disabled:text-primary-700 disabled:bg-primary-200",
                ],
                outline: [
                    "border-2 border-primary-700",
                    "bg-primary-50 hover:bg-primary-100 active:bg-primary-200",
                    "disabled:bg-transparent",

                    "dark:border-primary-300",
                    "dark:bg-primary-950 dark:hover:bg-primary-900 dark:active:bg-primary-800",
                ],
                link: ["hover:text-primary-400"],
                icon: [],
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3 text-sm",
                lg: "h-11 px-8 text-xl font-bold",
                icon: "h-6 w-6",
                link: "text-sm",
            },
            color: {
                default: "",
                danger: ["text-red-500 hover:text-red-400", "dark:text-red-500 dark:hover:text-red-400"],
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            color: "default",
        },
    },
);

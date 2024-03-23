import { cva, type VariantProps } from "class-variance-authority";

export type SelectVariantsProps = VariantProps<typeof SelectVariants>;

export const SelectVariants = cva([
    "outline-none cursor-pointer",
    "bg-primary-200 select-none",
    "border-2",
    "dark:text-primary-50 dark:[&>option]:text-primary-50",
    "dark:bg-primary-950 dark:ring-primary-50",
    "px-1",
]);

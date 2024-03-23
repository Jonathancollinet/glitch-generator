import { cva, type VariantProps } from "class-variance-authority";

export type SelectVariantsProps = VariantProps<typeof SelectVariants>;

export const SelectVariants = cva([
    "outline-none cursor-pointer",
    "bg-primary-50 select-none",
    "border-2",
    "dark:text-primary-50 dark:[&>option]:text-primary-50",
    "dark:bg-neutral-700 dark:ring-primary-50",
    "px-1",
]);

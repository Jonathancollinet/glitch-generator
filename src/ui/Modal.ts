import { cva, type VariantProps } from "class-variance-authority";

export type ModalVariantsProps = VariantProps<typeof ModalVariants>;

export const ModalVariants = cva(["flex justify-center items-center"]);

export const ContentVariants = cva([
    "max-w-xl p-6 bg-primary-100",
    "border-2 border-neutral-700",
    "dark:bg-neutral-900 dark:border-neutral-300",
]);

import { cva, type VariantProps } from "class-variance-authority";

export type FormGroupVariantsProps = VariantProps<typeof FormGroupVariants>;

export const FormGroupVariants = cva(["mb-2 ml-2 first:ml-0 last:mb-0"], {
    variants: {
        variant: {
            default: [],
            inline: ["flex flex-row items-center space-x-2"],
        },
        alignment: {
            default: "",
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
        size: {
            default: "",
            tiny: "w-16",
        },
    },
    defaultVariants: {
        variant: "default",
        alignment: "default",
        size: "default",
    },
});

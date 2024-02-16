import {type CxOptions, cx} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

export default function(...inputs: CxOptions) {
    return twMerge(cx(inputs));
}
import { debounce } from "vue-debounce";
import type { GlitchErrors } from "~/glitch/types";

interface FieldUpdate<Container>{
    obj: Record<keyof Container, string | number | object>,
    key: keyof Container,
    modifier?: (v: string) => string | number,
}

interface WithValue<Container, Value> extends FieldUpdate<Container> {
    value: Value
}

function applyModifier<Container>({
    obj,
    key,
    modifier = (v) => v,
    value
}: WithValue<Container, string>) {
    const modifiedValue = modifier(value);

    obj[key] = modifiedValue;
}

function updateValue<Container>({
    obj,
    key,
    modifier = (v) => v,
    value
}: WithValue<Container, string | Event>) {
    if (value) {
        if (value instanceof Event) {
            const targetValue = (value.target as HTMLInputElement)?.value;
    
            if (targetValue) {
                applyModifier<Container>({obj, key, modifier, value: targetValue});
            }
        } else {
            applyModifier({obj, key, modifier, value});
        }
    }
}

export function applyUpdater<Container>({
    obj,
    key,
    modifier = (v) => v,
    debounced
}: FieldUpdate<Container> & {debounced?: number | undefined}) {
    if (obj) {
        if (debounced) {
            return debounce((value: string | Event) => updateValue({obj, key, modifier, value}), debounced);
        }
        return (value: string | Event) => updateValue({obj, key, modifier, value});
    }
}

export function getErrorMessage(errors: Partial<GlitchErrors>, path: string) {
    const e = errors[path];

    if (e) {
        return `${e.path}.${e.code}`;
    }
}

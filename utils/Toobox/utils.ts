import { debounce } from "vue-debounce";
import type { GlitchErrors } from "~/plugins/glitch/types";

interface Updater<Container>{
    obj: Record<keyof Container, string | number | object>,
    key: keyof Container,
    modifier?: (v: string) => string | number,
}

interface UpdateParams<Container, Value> extends Updater<Container> {
    value: Value
}

export function getErrorMessage(errors: Partial<GlitchErrors>, path: string) {
    const e = errors[path];

    if (e) {
        return `${e.path}-${e.code}`;
    }
}

function applyModifier<Container>({
    obj,
    key,
    modifier = (v) => v,
    value
}: UpdateParams<Container, string>) {
    const modifiedValue = modifier(value);

    obj[key] = modifiedValue;
    // localObj[key] = modifiedValue;
}

function updateValue<Container>({
    obj,
    key,
    modifier = (v) => v,
    value
}: UpdateParams<Container, string | Event>) {
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
}: Updater<Container> & {debounced?: number | undefined}) {
    if (obj) {
        if (debounced) {
            return debounce((value: string | Event) => updateValue({obj, key, modifier, value}), debounced);
        }
        return (value: string | Event) => updateValue({obj, key, modifier, value});
    }
}

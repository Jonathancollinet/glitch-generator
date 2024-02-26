import { debounce } from "vue-debounce";
import type { GlitchErrors } from "~/glitch/types";

type ContainerRecord<Container> = {[key in keyof Container]?: string | number | object | boolean};

interface FieldUpdate<Container>{
    obj: ContainerRecord<Container>,
    key: keyof Container,
    modifier?: (v: string) => string | number | boolean,
    onUpdate?: (obj: ContainerRecord<Container>) => void
}

interface WithValue<Container, Value> extends FieldUpdate<Container> {
    value: Value
}

function applyModifier<Container>({
    obj,
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    value
}: WithValue<Container, string>) {
    const modifiedValue = modifier(value);

    obj[key] = modifiedValue;

    if (onUpdate) {
        onUpdate(obj);
    }
}

function updateValue<Container>({
    obj,
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    value
}: WithValue<Container, string | Event>) {
    if (value) {
        if (value instanceof Event) {
            const target = value.target as HTMLInputElement;
            let targetValue: string;

            if (target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
                targetValue = target.value;
            } else if (target.tagName === 'INPUT') {
                if (target.type === 'checkbox') {
                    // Boolean('false') === true, so we need to provide an empty string if !checked
                    targetValue = target.checked ? "true" : "";
                } else {
                    targetValue = target.value;
                }
            } else {
                targetValue = '';
            }
    
            if (targetValue) {
                applyModifier<Container>({obj, key, modifier, onUpdate, value: targetValue});
            }
        } else {
            applyModifier({obj, key, modifier, onUpdate, value});
        }
    }
}

export function applyUpdater<Container>({
    obj,
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    debounced
}: FieldUpdate<Container> & {debounced?: number | undefined}) {
    if (obj) {
        if (debounced) {
            return debounce((value: string | Event) => updateValue({obj, key, modifier, onUpdate, value}), debounced);
        }
        return (value: string | Event) => updateValue({obj, key, modifier, onUpdate, value});
    }
}

export function getErrorMessage(errors: Partial<GlitchErrors>, path: string) {
    const e = errors[path];

    if (e) {
        return `${e.path}.${e.code}`;
    }
}

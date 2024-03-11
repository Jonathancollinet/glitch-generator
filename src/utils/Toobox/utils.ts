import { debounce } from "vue-debounce";
import type { GlitchErrors, GlitchShadowField } from "~/glitch/types";

type ContainerRecord<Container> = {[key in keyof Container]?: string | number | object | boolean};

interface FieldUpdate<Container>{
    obj: ContainerRecord<Container>,
    localObj: ContainerRecord<Container>
    key: keyof Container,
    modifier?: (v: string) => string | number | boolean,
    onUpdate?: (obj: ContainerRecord<Container>) => void
}

interface WithValue<Container, Value> extends FieldUpdate<Container> {
    value: Value
}

function applyModifier<Container>({
    obj,
    localObj, 
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    value
}: WithValue<Container, string>) {
    const modifiedValue = modifier(value);

    obj[key] = modifiedValue;

    if (localObj && modifiedValue !== undefined && modifiedValue !== null && !Number.isNaN(modifiedValue)) {
        localObj[key] = modifiedValue;
    }

    if (onUpdate) {
        onUpdate(obj);
    }
}

function updateValue<Container>({
    obj,
    localObj, 
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    value
}: WithValue<Container, string | Event>) {
    if (value) {
        if (value instanceof Event) {
            const target = value.target as HTMLInputElement;
            let targetValue: string;
            const targetType = target.getAttribute('type');
            const isCheckbox = targetType === 'checkbox';

            if (target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
                targetValue = target.value;
            } else if (target.tagName === 'INPUT') {
                if (isCheckbox) {
                    targetValue = target.checked ? "true" : "";
                } else {
                    targetValue = target.value;
                }
            } else {
                targetValue = '';
            }
    
            if (isCheckbox || targetValue) {
                applyModifier<Container>({obj, localObj, key, modifier, onUpdate, value: targetValue});
            }
        } else {
            applyModifier({obj, localObj, key, modifier, onUpdate, value});
        }
    } else {
        if (localObj) {
            localObj[key] = value;
        }
    }
}

export function applyUpdater<Container>({
    obj,
    localObj,
    key,
    modifier = (v) => v,
    onUpdate = (obj) => void 0,
    debounced
}: FieldUpdate<Container> & {debounced?: number | undefined}) {
    if (obj) {
        if (debounced) {
            return debounce((value: string | Event) => updateValue({obj, localObj, key, modifier, onUpdate, value}), debounced);
        }
        return (value: string | Event) => updateValue({obj, localObj, key, modifier, onUpdate, value});
    }
}

export function getErrorMessage(errors: Partial<GlitchErrors>, path: string, withPrecision: boolean = false) {
    const e = errors[path];

    if (e) {
        if (withPrecision) {
            return `errors.config.${path}.${e.code}`;
        }
        return `errors.config.${e.code}`;
    }
}

export function getPossibleOffsetFrames(field: GlitchShadowField, range: GlitchShadowField[]) {
    if (field.offsetFrame !== 0) {
        const percents = [];
        const previousField = range[field.index - 1];
        const nextField = range[field.index + 1];
        let length;

        if (previousField && nextField) {
            length = (nextField.offsetFrame) - (previousField.offsetFrame + 1);
        } else if (previousField) {
            length = 101 - (previousField.offsetFrame + 1);
        } else {
            length = 0;
        }

        for (let i = 1; i <= length; ++i) {
            percents.push(previousField.offsetFrame + i);
        }

        return percents;
    } else {
        return [field.offsetFrame];
    }
}

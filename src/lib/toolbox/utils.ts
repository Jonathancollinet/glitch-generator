import { debounce } from "vue-debounce";
import G from "~/lib/glitch/types";

export type ContainerRecord<Container> = {
    [key in keyof Container]?: string | number | object | boolean;
};

export interface Sources<Container> {
    obj: ContainerRecord<Container>;
    localObj: ContainerRecord<Container>;
}

export interface FieldUpdate<Container> {
    key: keyof Container;
    modifier?: (v: string) => string | number | boolean;
    onUpdate?: (obj: ContainerRecord<Container>) => void;
}

export interface FieldUpdateWithSources<Container> extends FieldUpdate<Container>, Sources<Container> {}

export interface WithValue<Container, Value> extends FieldUpdateWithSources<Container> {
    value: Value;
}

export interface UpdateValue<Container> extends FieldUpdate<Container> {
    debounced?: number;
}

export type UpdateFn = (value: string | Event) => void;

function applyModifier<Container>({
    obj,
    localObj,
    key,
    modifier = (v) => v,
    onUpdate = () => void 0,
    value,
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
    onUpdate = () => void 0,
    value,
}: WithValue<Container, string | Event>) {
    if (value) {
        if (value instanceof Event) {
            const target = value.target as HTMLInputElement;
            let targetValue: string;
            const targetType = target.getAttribute("type");
            const isCheckbox = targetType === "checkbox";

            if (target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
                targetValue = target.value;
            } else if (target.tagName === "INPUT") {
                if (isCheckbox) {
                    targetValue = target.checked ? "true" : "";
                } else {
                    targetValue = target.value;
                }
            } else {
                targetValue = "";
            }

            if (isCheckbox || targetValue) {
                applyModifier<Container>({
                    obj,
                    localObj,
                    key,
                    modifier,
                    onUpdate,
                    value: targetValue,
                });
            }
        } else {
            applyModifier({ obj, localObj, key, modifier, onUpdate, value });
        }
    } else {
        if (localObj) {
            localObj[key] = value;
        }
    }
}

export function applyUpdater<Container>({ obj, localObj }: Sources<Container>) {
    return getUpdateFn<Container>({ obj, localObj });
}

export function getUpdateFn<Container>({ obj, localObj }: Sources<Container>) {
    return ({ key, modifier = (v) => v, onUpdate = () => void 0, debounced }: UpdateValue<Container>): UpdateFn => {
        if (obj) {
            if (debounced) {
                return debounce(
                    (value: string | Event) =>
                        updateValue({
                            obj,
                            localObj,
                            key,
                            modifier,
                            onUpdate,
                            value,
                        }),
                    debounced,
                );
            }

            return (value: string | Event) => updateValue({ obj, localObj, key, modifier, onUpdate, value });
        } else {
            console.error("No object to update");

            return () => void 0;
        }
    };
}

export function getErrorMessage(errors: Partial<G.Errors>, path: string, withPrecision: boolean = false) {
    const e = errors[path];

    if (e) {
        if (withPrecision) {
            return `errors.config.${path}.${e.code}`;
        }
        return `errors.config.${e.code}`;
    }
}

export function getPossibleOffsetFrames(field: G.Field, range: G.Field[]) {
    if (field.offsetFrame !== 0) {
        const percents = [];
        const previousField = range[field.index - 1];
        const nextField = range[field.index + 1];
        const length = previousField ? (nextField?.offsetFrame || 101) - (previousField.offsetFrame + 1) : 0;

        for (let i = 1; i <= length; ++i) {
            percents.push(previousField.offsetFrame + i);
        }

        return percents;
    } else {
        return [field.offsetFrame];
    }
}

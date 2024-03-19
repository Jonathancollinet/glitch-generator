import G from "~/lib/glitch/types";

export type PropertyValueGetter = {
    [key in G.PropertyName]: (value: string) => G.Declarations.Shadow;
};

const propertyValuesGetter: PropertyValueGetter = {
    [G.PropertyName.TextShadow]: getTextShadowValues,
    [G.PropertyName.BoxShadow]: getBoxShadowValues,
};

function getTextShadowValues(value: string) {
    return getShadowValues(value).props as G.Declarations.TextShadow;
}

function getBoxShadowValues(value: string) {
    const shadow = getShadowValues(value);
    const props = shadow.props as G.Declarations.BoxShadow;
    const shadowValues = shadow.shadowValues;

    if (shadowValues) {
        if (shadowValues.length === 4) {
            props.spread = +shadowValues[3].replace(/px/gim, "");
        }
    }

    return props as G.Declarations.BoxShadow;
}

function getShadowValues(value: string) {
    const props: Partial<G.Declarations.Shadow> = {};
    const shadowValues = value.match(/([+-]?\d+(\.\d+)?px)/gim);

    props.color = getGlitchColorFrom(value);

    if (shadowValues) {
        props.offsetX = +shadowValues[0].replace(/px/gim, "");
        props.offsetY = +shadowValues[1].replace(/px/gim, "");

        if (shadowValues.length === 3) {
            props.blur = +shadowValues[2].replace(/px/gim, "");
        } else {
            props.blur = 0;
        }
    }

    return {
        props: props as G.Declarations.Shadow,
        shadowValues,
    };
}

export default propertyValuesGetter;

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
    const sizes = shadow.sizes;

    if (sizes) {
        if (sizes.length === 4) {
            props.spread = +sizes[3].replace(/px/gim, "");
        }
    }

    return props as G.Declarations.BoxShadow;
}

function getShadowValues(value: string) {
    const props: Partial<G.Declarations.Shadow> = {};
    const sizes = value.match(/([-]?\d+px)/gim);

    props.color = getGlitchColorFrom(value);

    if (sizes) {
        props.offsetX = +sizes[0].replace(/px/gim, "");
        props.offsetY = +sizes[1].replace(/px/gim, "");

        if (sizes.length === 3) {
            props.blur = +sizes[2].replace(/px/gim, "");
        }
    }

    return {
        props: props as G.Declarations.Shadow,
        sizes,
    };
}

export default propertyValuesGetter;

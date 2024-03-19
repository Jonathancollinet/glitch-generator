import G from "~/lib/glitch/types";

const getPropertyData = {
    [G.PropertyName.TextShadow]: getTextShadowData,
    [G.PropertyName.BoxShadow]: getBoxShadowData,
};

function getTextShadowData(property: G.Declarations.TextShadow) {
    const positions = getShadowPositions(property);
    const color = hexToRGB(property.color.hex, property.color.alphaPercent);

    return `${positions} ${color}`;
}

function getBoxShadowData(property: G.Declarations.BoxShadow) {
    const positions = getShadowPositions(property);
    const color = hexToRGB(property.color.hex, property.color.alphaPercent);
    const spread = property.spread;

    return `${positions} ${spread}px ${color}`;
}

export function getShadowPositions(property: G.Declarations.Shadow) {
    const offsetX = property.offsetX;
    const offsetY = property.offsetY;
    const blur = property.blur;

    return `${offsetX}px ${offsetY}px ${blur}px`;
}

export default getPropertyData;

import chroma from "chroma-js"

export const getFontColor = (color) => chroma(color).luminance() > 0.5 ? 'black' : 'white';

export const getRandomColor = () => chroma.random().toString();

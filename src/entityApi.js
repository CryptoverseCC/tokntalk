import colors from "./colors";

export const getEntityData = async catId => {
  try {
    const res = await fetch(`https://api.cryptokitties.co/kitties/${catId}`);
    const data = await res.json();
    data.color = colors[data.color];
    return data;
  } catch (e) {
    return undefined;
  }
};

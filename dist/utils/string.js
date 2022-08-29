export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
export const parseCamelCase = (str) => str.split(/(?=[A-Z])/).map((str) => str.toLowerCase());
export const replace = (str, replace, to = '') => {
    const exp = replace instanceof RegExp ? replace : new RegExp(replace, 'gism');
    return str.replace(exp, to);
};
export const replaceAll = (str, replaces) => {
    if (replaces.every((replace) => Array.isArray(replace))) {
        return replaces.reduce((acc, [reg, rep]) => replace(acc, reg, rep), str);
    }
    return replace(str, replaces[0], replaces[1]);
};

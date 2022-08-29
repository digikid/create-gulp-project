export const toDefaults = (params) => Object.entries(params).reduce((acc, [key, values]) => {
    if (key !== 'common') {
        acc[key] = values;
    }
    return acc;
}, {});

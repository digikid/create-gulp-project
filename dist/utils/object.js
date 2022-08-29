export const isObject = (obj) => !!obj && typeof obj === 'object' && obj.constructor === Object;
export const findDeep = (obj, cb) => {
    const keys = Object.keys(obj) || [];
    let result = [];
    if (cb(obj)) {
        result = [...result, obj];
    }
    for (let i = 0; i < keys.length; i++) {
        const value = obj[keys[i]];
        if (typeof value === 'object' && value != null) {
            const o = findDeep(value, cb);
            if (o != null && Array.isArray(o)) {
                result = [...result, ...o];
            }
        }
    }
    return result;
};

export const mergeDeep = (target, ...sources) => {
    if (!sources.length) {
        return target;
    };

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {
                        [key]: {}
                    });
                };

                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            };
        };
    };

    return mergeDeep(target, ...sources);
};

export const findDeep = (obj, cb) => {
    const keys = Object.keys(obj) || [];

    let result = [];

    if (cb(obj)) {
        result = [...result, obj];
    };

    for (let i = 0; i < keys.length; i++) {
        let value = obj[keys[i]];

        if (typeof value === 'object' && value != null) {
            let o = findDeep(value, cb);

            if (o != null && o instanceof Array) {
                result = [...result, ...o];
            };
        };
    };

    return result;
};
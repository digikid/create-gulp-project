import path from 'path';

import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dir = (child = '') => child ? path.join(__dirname, `../../${child}`) : __dirname;

export const cwd = (child = '') => child ? path.join(process.cwd(), child) : process.cwd();

export const parseRepoUrl = url => {
    const keys = ['protocol', 'separator', 'host', 'owner', 'name'];
    const reg = /^(https|git)(:\/\/|@)([^\/:]+)[\/:]([^\/:]+)\/(.+).git$/;

    const fullUrl = url.includes('.git') ? url : `${url}.git`;

    const result = keys.reduce((acc, key) => {
        const index = keys.indexOf(key) + 1;

        acc[key] = url ? fullUrl.replace(reg, `\$${index}`) : '';

        return acc;
    }, {});

    return result;
};
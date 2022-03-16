import fetch from 'node-fetch';

import { dir } from '#lib/utils/path';
import { readFileAsync } from '#lib/utils/fs';
import { error } from '#lib/utils/log';

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

export const parsePackageJson = async() => {
    const pjsonPath = dir('package.json');
    const pjson = await readFileAsync(pjsonPath);

    return JSON.parse(pjson);
};

export const isNewestVersion = async () => {
    const pjson = await parsePackageJson();

    const { version: localVersion, repository: { url } } = pjson;
    const { owner, name } = parseRepoUrl(url);

    const apiUrl = `https://api.github.com/repos/${owner}/${name}/tags`;

    try {
        const response = await fetch(apiUrl);
        const tags = await response.json();

        const { name: latestVersion } = tags[0];

        return localVersion === latestVersion;
    } catch(e) {
        error('CHECK_VERSION_ERROR', e);

        process.exit(1);
    };
};

export const validateName = name => {
    const regex = /[<>:"\/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;

    if (!name.trim().length || regex.test(name)) {
        return false;
    };

    return true;
};
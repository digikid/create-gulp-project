var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
export const parts = ['protocol', 'separator', 'host', 'owner', 'name'];
export const parseRepoUrl = (json) => {
    const url = typeof json === 'string' ? json : json.repository.url;
    const fullUrl = url.includes('.git') ? url : `${url}.git`;
    const reg = /^(https|git)(:\/\/|@)([^/:]+)[/:]([^/:]+)\/(.+).git$/;
    const result = parts.reduce((acc, key) => {
        const index = parts.indexOf(key) + 1;
        acc[key] = url ? fullUrl.replace(reg, `$${index}`) : '';
        return acc;
    }, {});
    return result;
};
export const getVersion = (json) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner, name } = parseRepoUrl(json);
    const versions = [json.version];
    try {
        const response = yield fetch(`https://api.github.com/repos/${owner}/${name}/tags`);
        const tags = yield response.json();
        if (Array.isArray(tags) && tags.length) {
            const latest = tags[0];
            if ('name' in latest && typeof latest.name === 'string') {
                versions.push(latest.name);
            }
        }
    }
    catch (e) { }
    return versions;
});
export const isVersionOutdated = (current, latest) => {
    const currentParts = current.split('.');
    const latestParts = latest.split('.');
    for (let i = 0; i < latestParts.length; i++) {
        const a = ~~latestParts[i];
        const b = ~~currentParts[i];
        if (a > b)
            return true;
        if (a < b)
            return false;
    }
    return false;
};

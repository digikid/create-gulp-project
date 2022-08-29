var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dree from 'dree';
import ncp from 'ncp';
import fs, { promises } from 'fs';
import { findDeep } from './object.js';
import { replaceAll } from './string.js';
export const isExists = (path) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        }
    }
    catch (e) {
        return false;
    }
    return false;
};
export const isExistsAsync = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises.access(path);
        return true;
    }
    catch (e) {
        return false;
    }
});
export const readFile = (path) => fs.readFileSync(path, { encoding: 'utf8' });
export const readFileAsync = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises.readFile(path, { encoding: 'utf-8' });
        return data;
    }
    catch (e) {
        return '';
    }
});
export const writeFileAsync = (path, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield promises.writeFile(path, data);
});
export const removeFileAsync = (path) => __awaiter(void 0, void 0, void 0, function* () {
    yield promises.unlink(path);
});
export const replaceAsync = (path, replaces) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = Array.isArray(path) ? path : [path];
    for (path of paths) {
        const data = yield readFileAsync(path);
        yield writeFileAsync(path, replaceAll(data, replaces));
    }
});
export const mergeDirsAsync = (source, dest) => new Promise((resolve, reject) => {
    ncp(source, dest, (e) => {
        if (e) {
            reject(e);
        }
        resolve();
    });
});
export const scanFiles = (path, options = {}) => {
    const tree = dree.scan(path, Object.assign({ showHidden: false, symbolicLinks: false }, options));
    return findDeep(tree, ({ type }) => type === 'file');
};
export const scanDirectory = (path, options = {}) => {
    try {
        const result = dree.scan(path, Object.assign({ showHidden: false }, options));
        const tree = (result && ('children' in result)) ? result.children : [];
        return tree || [];
    }
    catch (e) {
        return [];
    }
};
export const isDirectoryExists = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if (path && (yield isExistsAsync(path))) {
        return true;
    }
    return false;
});

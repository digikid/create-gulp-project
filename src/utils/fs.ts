import dree from 'dree';
import ncp from 'ncp';

import fs, { promises } from 'fs';

import path from 'path';
import { findDeep } from './object.js';
import { replaceAll, type StringReplaces } from './string.js';

export const isExists = (path: string): boolean => {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
};

export const isExistsAsync = async (path: string): Promise<boolean> => {
  try {
    await promises.access(path);

    return true;
  } catch (e) {
    return false;
  }
};

export const readFile = (path: string): string => fs.readFileSync(path, { encoding: 'utf8' });

export const readFileAsync = async (path: string): Promise<string> => {
  try {
    const data = await promises.readFile(path, { encoding: 'utf-8' });

    return data;
  } catch (e) {
    return '';
  }
};

export const writeFileAsync = async (path: string, data: string): Promise<void> => {
  await promises.writeFile(path, data);
};

export const removeFileAsync = async (path: string): Promise<void> => {
  await promises.unlink(path);
};

export const replaceAsync = async (path: string | string[], replaces: StringReplaces | StringReplaces[]) => {
  const paths = Array.isArray(path) ? path : [path];

  for (path of paths) {
    const data = await readFileAsync(path);

    await writeFileAsync(path, replaceAll(data, replaces));
  }
};

export const mergeDirsAsync = (source: string, dest: string): Promise<void | Error[]> => new Promise((resolve, reject) => {
  ncp(source, dest, (e) => {
    if (e) {
      reject(e);
    }

    resolve();
  });
});

export const scanFiles = (path: string, options = {}) => {
  const tree = dree.scan(path, {
    showHidden: false,
    symbolicLinks: false,
    ...options,
  });

  return findDeep(tree, ({ type }) => type === 'file');
};

export const scanDirectory = (path: string, options = {}) => {
  try {
    const result = dree.scan(path, {
      showHidden: false,
      ...options,
    });

    const tree = (result && ('children' in result)) ? result.children : [];

    return tree || [];
  } catch (e) {
    return [];
  }
};

export const isDirectoryExists = async (path: string): Promise<boolean> => {
  if (path && await isExistsAsync(path)) {
    return true;
  }

  return false;
};

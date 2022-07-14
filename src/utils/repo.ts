import fetch from 'node-fetch';

import { type IPackageJson } from '../classes/Store.js';

export const parts = ['protocol', 'separator', 'host', 'owner', 'name'] as const;

export type RepoParts = {
  [key in typeof parts[number]]: string;
};

export const parseRepoUrl = (json: string | IPackageJson): RepoParts => {
  const url = typeof json === 'string' ? json : json.repository.url;

  const fullUrl = url.includes('.git') ? url : `${url}.git`;
  const reg = /^(https|git)(:\/\/|@)([^/:]+)[/:]([^/:]+)\/(.+).git$/;

  const result = parts.reduce((acc, key) => {
    const index = parts.indexOf(key) + 1;

    acc[key] = url ? fullUrl.replace(reg, `$${index}`) : '';

    return acc;
  }, {} as RepoParts);

  return result;
};

export const getVersion = async (json: IPackageJson): Promise<string[]> => {
  const { owner, name } = parseRepoUrl(json);

  const versions = [json.version];

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${name}/tags`);
    const tags = await response.json();

    if (Array.isArray(tags) && tags.length) {
      const latest = tags[0];

      if ('name' in latest && typeof latest.name === 'string') {
        versions.push(latest.name);
      }
    }
  } catch (e) {}

  return versions;
};

export const isVersionOutdated = (current: string, latest: string): boolean => {
  const currentParts = current.split('.');
  const latestParts = latest.split('.');

  for (let i = 0; i < latestParts.length; i++) {
    const a = ~~latestParts[i];
    const b = ~~currentParts[i];

    if (a > b) return true;
    if (a < b) return false;
  }

  return false;
};

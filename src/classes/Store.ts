import path from 'path';
import ConfigStore from 'configstore';

import { __dirname } from '../utils/path.js';
import { readFile } from '../utils/fs.js';
import { parse as parseArgs } from '../utils/args.js';
import { toDefaults } from '../utils/store.js';
import { type Entries } from '../utils/object.js';

export const paramArgs = ['force'] as const;
export const dependencies = ['animate', 'bootstrap', 'datepicker', 'fancybox', 'mask', 'lozad', 'simplebar', 'swiper', 'tippy'] as const;
export const repoHosts = ['github', 'gitlab', 'bitbucket'] as const;

export type ParamArgsKeys = typeof paramArgs[number];
export type DependenciesNames = typeof dependencies[number];
export type RepoHostsNames = typeof repoHosts[number];

export interface IPackageJson {
  name: string;
  version: string;
  description: string;
  author: string;
  homepage: string;
  repository: {
    url: string;
  },
  bugs: {
    url: string;
  }
}

export interface ICommon {
  name: string;
  title: string;
  description: string;
}

export interface IRepo {
  host: RepoHostsNames;
  owner: string;
}

export interface IContacts {
  name: string;
  job: string;
  email: string;
  telegram: string;
  website: string;
}

export interface IInfo {
  copyright: string;
}

export interface IStoredParams {
  repo: IRepo;
  contacts: IContacts;
  info: IInfo;
  dependencies: DependenciesNames[];
  boilerplate: boolean;
}

export interface IParams extends IStoredParams {
  common: ICommon;
}

export interface IStoreBoilerplate {
  install: string | string[];
  files: string[];
  exclude: string[];
}

export type StoreBoilerplate = Record<DependenciesNames, IStoreBoilerplate>;

export interface IStoreRepo {
  url: string;
}

export type StoreArgs = Record<ParamArgsKeys, boolean | string>;

export interface IStoreConfig {
  packageJson: IPackageJson;
  repo: IStoreRepo;
  defaults: IParams;
  boilerplate: StoreBoilerplate;
}

const configFiles = {
  packageJson: 'package.json',
  repo: 'src/config/repo.json',
  defaults: 'src/config/defaults.json',
  boilerplate: 'src/config/boilerplate.json',
} as const;

export const storeConfig = (Object.entries(configFiles) as Entries<typeof configFiles>).reduce((acc, [key, file]) => {
  acc[key] = JSON.parse(readFile(path.join(__dirname, file)));

  return acc;
}, {} as IStoreConfig);

export const storeDefaults = toDefaults(storeConfig.defaults);

export interface IStore {
  readonly store: ConfigStore;
  readonly repo: IStoreRepo;
  readonly boilerplate: StoreBoilerplate;
  readonly args: StoreArgs;
  readonly packageJson: IPackageJson;
  readonly defaults: IParams;
  readonly storeDefaults: IStoredParams;
  readonly params: IParams;
  readonly dependencies: readonly DependenciesNames[];
  readonly repoHosts: readonly RepoHostsNames[];

  get storedParams(): IStoredParams;
  set storedParams(defaults: IStoredParams);
}

export default class Store implements IStore {
  constructor() {
    this.packageJson = storeConfig.packageJson;
    this.store = new ConfigStore(storeConfig.packageJson.name, { params: storeDefaults });
  }

  public store: ConfigStore;

  public packageJson: IPackageJson;

  public repo = storeConfig.repo;

  public boilerplate = storeConfig.boilerplate;

  public defaults = storeConfig.defaults;

  public storeDefaults = storeDefaults;

  public params = storeConfig.defaults;

  public dependencies = dependencies;

  public repoHosts = repoHosts;

  public args = parseArgs<ParamArgsKeys>(paramArgs);

  get storedParams(): IStoredParams {
    return this.store.get('params');
  }

  set storedParams(params: IStoredParams) {
    this.store.set('params', params);
  }
}

import ConfigStore from 'configstore';
export declare const paramArgs: readonly ["force"];
export declare const dependencies: readonly ["animate", "bootstrap", "datepicker", "fancybox", "mask", "lozad", "simplebar", "swiper", "tippy"];
export declare const repoHosts: readonly ["github", "gitlab", "bitbucket"];
export declare type ParamArgsKeys = typeof paramArgs[number];
export declare type DependenciesNames = typeof dependencies[number];
export declare type RepoHostsNames = typeof repoHosts[number];
export interface IPackageJson {
    name: string;
    version: string;
    description: string;
    author: string;
    homepage: string;
    repository: {
        url: string;
    };
    bugs: {
        url: string;
    };
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
export declare type StoreBoilerplate = Record<DependenciesNames, IStoreBoilerplate>;
export interface IStoreRepo {
    url: string;
}
export declare type StoreArgs = Record<ParamArgsKeys, boolean | string>;
export interface IStoreConfig {
    packageJson: IPackageJson;
    repo: IStoreRepo;
    defaults: IParams;
    boilerplate: StoreBoilerplate;
}
export declare const storeConfig: IStoreConfig;
export declare const storeDefaults: IStoredParams;
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
    constructor();
    store: ConfigStore;
    packageJson: IPackageJson;
    repo: IStoreRepo;
    boilerplate: StoreBoilerplate;
    defaults: IParams;
    storeDefaults: IStoredParams;
    params: IParams;
    dependencies: readonly ["animate", "bootstrap", "datepicker", "fancybox", "mask", "lozad", "simplebar", "swiper", "tippy"];
    repoHosts: readonly ["github", "gitlab", "bitbucket"];
    args: import("../utils/args.js").ArgsObject<"force">;
    get storedParams(): IStoredParams;
    set storedParams(params: IStoredParams);
}
//# sourceMappingURL=Store.d.ts.map
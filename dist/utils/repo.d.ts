import { type IPackageJson } from '../classes/Store.js';
export declare const parts: readonly ["protocol", "separator", "host", "owner", "name"];
export declare type RepoParts = {
    [key in typeof parts[number]]: string;
};
export declare const parseRepoUrl: (json: string | IPackageJson) => RepoParts;
export declare const getVersion: (json: IPackageJson) => Promise<string[]>;
export declare const isVersionOutdated: (current: string, latest: string) => boolean;
//# sourceMappingURL=repo.d.ts.map
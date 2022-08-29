import dree from 'dree';
import { type StringReplaces } from './string.js';
export declare const isExists: (path: string) => boolean;
export declare const isExistsAsync: (path: string) => Promise<boolean>;
export declare const readFile: (path: string) => string;
export declare const readFileAsync: (path: string) => Promise<string>;
export declare const writeFileAsync: (path: string, data: string) => Promise<void>;
export declare const removeFileAsync: (path: string) => Promise<void>;
export declare const replaceAsync: (path: string | string[], replaces: StringReplaces | StringReplaces[]) => Promise<void>;
export declare const mergeDirsAsync: (source: string, dest: string) => Promise<void | Error[]>;
export declare const scanFiles: (path: string, options?: {}) => dree.Dree[];
export declare const scanDirectory: (path: string, options?: {}) => dree.Dree[];
export declare const isDirectoryExists: (path: string) => Promise<boolean>;
//# sourceMappingURL=fs.d.ts.map
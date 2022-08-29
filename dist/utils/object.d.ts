export declare type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
export declare const isObject: (obj: any) => obj is Object;
export declare const findDeep: <T>(obj: T, cb: (obj: T) => boolean) => T[];
//# sourceMappingURL=object.d.ts.map
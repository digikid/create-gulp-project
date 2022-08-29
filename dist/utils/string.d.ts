export declare const capitalize: (str: string) => string;
export declare const parseCamelCase: (str: string) => string[];
export declare type StringReplacer = RegExp | string;
export declare type StringReplaces = [StringReplacer, (string | undefined)];
export declare const replace: (str: string, replace: StringReplacer, to?: string) => string;
export declare const replaceAll: (str: string, replaces: StringReplaces | StringReplaces[]) => string;
//# sourceMappingURL=string.d.ts.map
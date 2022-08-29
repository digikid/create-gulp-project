export declare const args: string[];
export declare function arg(arg: string, parseValue?: false): boolean;
export declare function arg(arg: string, parseValue?: true): string;
export declare const command: (name: string) => boolean;
export declare type ArgsObject<T extends string> = Record<T, string | boolean>;
export declare const parse: <T extends string>(args: readonly T[]) => ArgsObject<T>;
//# sourceMappingURL=args.d.ts.map
export declare type Locale = Record<string, string>;
export declare type Locales = {
    [key: string]: Locale;
};
export declare const defaultLocale = "en-US";
export declare const getLocale: () => Promise<Locale>;
//# sourceMappingURL=locale.d.ts.map
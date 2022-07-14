export const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const parseCamelCase = (str: string): string[] => str.split(/(?=[A-Z])/).map((str) => str.toLowerCase());

export type StringReplacer = RegExp | string;
export type StringReplaces = [StringReplacer, (string | undefined)];

export const replace = (str: string, replace: StringReplacer, to: string = ''): string => {
  const exp = replace instanceof RegExp ? replace : new RegExp(replace, 'gism');

  return str.replace(exp, to);
};

export const replaceAll = (str: string, replaces: StringReplaces | StringReplaces[]): string => {
  if ((replaces as []).every((replace: any) => Array.isArray(replace))) {
    return (replaces as StringReplaces[]).reduce((acc, [reg, rep]) => replace(acc, reg, rep), str);
  }

  return replace(str, replaces[0] as string, (replaces[1] as string));
};

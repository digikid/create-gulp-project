export const args = process.argv.slice(2);

export function arg(arg: string, parseValue?: false): boolean;
export function arg(arg: string, parseValue?: true): string;
export function arg(arg: string, parseValue?: boolean): boolean | string {
  const name = arg.replace(/^([-\s]*)([a-zA-Z\d])/gm, '$2');
  const key = `--${name}`;
  const shortKey = `-${name.substring(0, 1).toLowerCase()}`;
  const value = [key, shortKey].some((key) => args.includes(key));

  if (parseValue) {
    const index = args.findIndex((arg) => [key, shortKey].includes(arg));
    const nextIndex = index + 1;

    if (index >= 0) {
      const next = args[nextIndex];

      if (typeof next === 'string' && !next.includes('-')) {
        return next;
      }
    }

    return '';
  }

  return value;
}

export const command = (name: string): boolean => args.includes(name);

export type ArgsObject<T extends string> = Record<T, string | boolean>;

export const parse = <T extends string>(args: readonly T[]): ArgsObject<T> => args.reduce((acc, key) => {
  acc[key] = arg(key, true) || arg(key);

  return acc;
}, {} as ArgsObject<T>);

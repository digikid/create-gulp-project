export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export const isObject = (obj: any): obj is Object => !!obj && typeof obj === 'object' && obj.constructor === Object;

export const findDeep = <T extends Record<string, any>>(obj: T, cb: (obj: T) => boolean): T[] => {
  const keys = (Object.keys(obj) as (keyof typeof obj)[]) || [];

  let result: T[] = [];

  if (cb(obj)) {
    result = [...result, obj];
  }

  for (let i = 0; i < keys.length; i++) {
    const value = obj[keys[i]];

    if (typeof value === 'object' && value != null) {
      const o = findDeep(value as any, cb);

      if (o != null && Array.isArray(o)) {
        result = [...result, ...o];
      }
    }
  }

  return result;
};

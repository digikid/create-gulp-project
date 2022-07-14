import { type IParams, type IStoredParams } from '../classes/Store.js';
import { type Entries } from './object';

export const toDefaults = (params: IParams) => (Object.entries(params) as Entries<IParams>).reduce((acc, [key, values]) => {
  if (key !== 'common') {
    (acc[key] as any) = values;
  }

  return acc;
}, {} as IStoredParams);

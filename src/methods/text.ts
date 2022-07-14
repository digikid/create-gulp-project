import { format, type ChalkOptions } from '../utils/log.js';
import { type IApp } from '../classes/App.js';

export type TextMethod = (code: any, ...options: ChalkOptions) => string;

export default (function (this: IApp, code, ...options) {
  const text = (code in this.locale) ? this.locale[code] : code;

  return format(text, ...options);
}) as TextMethod;

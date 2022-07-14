import { format, type ChalkOptions } from '../utils/log.js';
import { type ILogger } from '../classes/Logger.js';

export type LoggerPrintMethod = (code: any, ...options: ChalkOptions) => void;

export default (function (this: ILogger, code, ...options) {
  const text = (code in this.locale) ? this.locale[code] : code;

  if (text) {
    console.log(format(text, ...options));
  }
}) as LoggerPrintMethod;

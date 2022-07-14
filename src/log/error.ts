import chalk from 'chalk';
import logSymbols from 'log-symbols';

import { type ILogger } from '../classes/Logger.js';

export type LoggerErrorMethod = (code: any, e?: unknown) => void;

export default (function (this: ILogger, code, e?) {
  const text = (code in this.locale) ? this.locale[code] : code;

  if (text) {
    console.log(`${logSymbols.error} ${chalk.bold.red(text)}`);
  }

  if (e instanceof Error) {
    console.log(chalk.italic.gray(e.message));

    process.exit(1);
  }
}) as LoggerErrorMethod;

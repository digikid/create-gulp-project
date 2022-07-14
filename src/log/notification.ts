import chalk from 'chalk';
import logSymbols from 'log-symbols';

import { type ILogger } from '../classes/Logger.js';

const notifications = ['success', 'warning', 'info'] as const;

const colors = {
  success: 'green',
  info: 'cyan',
  warning: 'yellow',
} as const;

export type LoggerNotifications = typeof notifications[number];

export type LoggerNotificationMethod = (code: any) => void;
export type LoggerNotificationGetter = (type: LoggerNotifications) => LoggerNotificationMethod;

export default (function (this: ILogger, type) {
  const color = colors[type];
  const symbol = logSymbols[type];

  return ((code) => {
    const text = (code in this.locale) ? this.locale[code] : code;

    if (text) {
      console.log(`${symbol} ${chalk.bold[color](text)}`);
    }
  }) as LoggerNotificationMethod;
}) as LoggerNotificationGetter;

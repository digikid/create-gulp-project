import error, { type LoggerErrorMethod } from '../log/error.js';
import notification, { type LoggerNotificationMethod } from '../log/notification.js';
import print, { type LoggerPrintMethod } from '../log/print.js';
import separate, { type LoggerSeparateMethod } from '../log/separate.js';

import { type Locale } from '../utils/locale.js';

export interface ILogger {
  readonly locale: Locale;
  readonly print: LoggerPrintMethod;
  readonly error: LoggerErrorMethod;
  readonly separate: LoggerSeparateMethod;
  readonly success: LoggerNotificationMethod;
  readonly info: LoggerNotificationMethod;
  readonly warning: LoggerNotificationMethod;
}

export default class Logger implements ILogger {
  constructor(public locale: Locale) {}

  public print = print;

  public error = error;

  public separate = separate;

  public success = notification.call(this, 'success');

  public warning = notification.call(this, 'warning');

  public info = notification.call(this, 'info');
}

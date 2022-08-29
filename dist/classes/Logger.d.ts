import { type LoggerErrorMethod } from '../log/error.js';
import { type LoggerNotificationMethod } from '../log/notification.js';
import { type LoggerPrintMethod } from '../log/print.js';
import { type LoggerSeparateMethod } from '../log/separate.js';
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
    locale: Locale;
    constructor(locale: Locale);
    print: LoggerPrintMethod;
    error: LoggerErrorMethod;
    separate: LoggerSeparateMethod;
    success: LoggerNotificationMethod;
    warning: LoggerNotificationMethod;
    info: LoggerNotificationMethod;
}
//# sourceMappingURL=Logger.d.ts.map
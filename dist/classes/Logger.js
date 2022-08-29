import error from '../log/error.js';
import notification from '../log/notification.js';
import print from '../log/print.js';
import separate from '../log/separate.js';
export default class Logger {
    constructor(locale) {
        this.locale = locale;
        this.print = print;
        this.error = error;
        this.separate = separate;
        this.success = notification.call(this, 'success');
        this.warning = notification.call(this, 'warning');
        this.info = notification.call(this, 'info');
    }
}

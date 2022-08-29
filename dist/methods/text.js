import { format } from '../utils/log.js';
export default (function (code, ...options) {
    const text = (code in this.locale) ? this.locale[code] : code;
    return format(text, ...options);
});

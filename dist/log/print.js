import { format } from '../utils/log.js';
export default (function (code, ...options) {
    const text = (code in this.locale) ? this.locale[code] : code;
    if (text) {
        console.log(format(text, ...options));
    }
});

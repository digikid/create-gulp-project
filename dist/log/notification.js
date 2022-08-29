import chalk from 'chalk';
import logSymbols from 'log-symbols';
const notifications = ['success', 'warning', 'info'];
const colors = {
    success: 'green',
    info: 'cyan',
    warning: 'yellow',
};
export default (function (type) {
    const color = colors[type];
    const symbol = logSymbols[type];
    return ((code) => {
        const text = (code in this.locale) ? this.locale[code] : code;
        if (text) {
            console.log(`${symbol} ${chalk.bold[color](text)}`);
        }
    });
});

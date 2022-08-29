import chalk from 'chalk';
import logSymbols from 'log-symbols';
export default (function (code, e) {
    const text = (code in this.locale) ? this.locale[code] : code;
    if (text) {
        console.log(`${logSymbols.error} ${chalk.bold.red(text)}`);
    }
    if (e instanceof Error) {
        console.log(chalk.italic.gray(e.message));
        process.exit(1);
    }
});

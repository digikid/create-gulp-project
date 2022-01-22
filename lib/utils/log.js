import chalk from 'chalk';
import ora from 'ora';
import cliSpinners from 'cli-spinners';
import logSymbols from 'log-symbols';

import { dir } from '#lib/utils/path';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const MESSAGES = require(dir('config/messages.json'));

export const t = code => (code in MESSAGES ? MESSAGES[code] : '');

export const spinner = (type = 'bouncingBar') => {
    const spinner = cliSpinners[type];

    const loader = ora({
        spinner
    });

    const wrap = (code, cb) => {
        if (!(code in MESSAGES)) return;

        const text = MESSAGES[code];

        cb(text);
    };

    const start = code => wrap(code, text => loader.start(chalk.bold.cyan(text)));
    const success = code => wrap(code, text => loader.succeed(chalk.bold.green(text)));
    const warn = code => wrap(code, text => loader.succeed(chalk.bold.yellow(text)));
    const info = code => wrap(code, text => loader.succeed(chalk.bold.blue(text)));

    const error = (code, e) => wrap(code, text => {
        loader.fail(chalk.bold.red(text));

        if (e && e.message) {
            console.log(e.message);
        };
    });

    return {
        start,
        success,
        warn,
        info,
        error
    };
};

export const print = code => {
    const text = t(code);

    const {
        success: successSymbol,
        error: errorSymbol
    } = logSymbols;

    let message;

    if (text) {
        if (code.includes('ERROR')) {
            message = chalk.bold.red(`${errorSymbol} ${text}`);
        } else if (code.includes('SUCCESS')) {
            message = chalk.bold.green(`${successSymbol} ${text}`);
        } else if (code.includes('TEXT')) {
            message = chalk(text);
        } else {
            message = chalk.bold(text);
        };

        console.log(message);
    };
};

export const error = (code, e) => {
    print(code || 'DEFAULT_ERROR');

    console.log(e.message || e);
};

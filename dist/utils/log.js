import chalk from 'chalk';
export const format = (text, ...options) => {
    if (options.length) {
        return options.reduce((acc, option) => chalk[option](acc), text);
    }
    return text;
};

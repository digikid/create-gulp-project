import chalk from 'chalk';
import ora from 'ora';
import cliSpinners from 'cli-spinners';
export default class Spinner {
    constructor(text, name = 'bouncingBar') {
        this.text = text;
        this.name = name;
        this.spinner = ora({
            spinner: cliSpinners[name],
        });
        this.spinner.start(chalk.bold.cyan(text));
    }
    success(text) {
        this.spinner.succeed(chalk.bold.green(text));
    }
    error(text, e) {
        this.spinner.fail(chalk.bold.red(text));
        if (e instanceof Error) {
            console.log(chalk.italic.gray(e.message));
        }
        process.exit(1);
    }
}

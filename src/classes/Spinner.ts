import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import cliSpinners, { type SpinnerName } from 'cli-spinners';

export interface ISpinner {
  readonly text: string;
  readonly name: SpinnerName;
  readonly spinner: Ora;

  readonly success: (text: string) => void;
  readonly error: (text: string, e: unknown) => void;
}

export default class Spinner {
  constructor(public text: string, public name: SpinnerName = 'bouncingBar') {
    this.spinner = ora({
      spinner: cliSpinners[name],
    });

    this.spinner.start(chalk.bold.cyan(text));
  }

  public spinner: Ora;

  success(text: string) {
    this.spinner.succeed(chalk.bold.green(text));
  }

  error(text: string, e: unknown) {
    this.spinner.fail(chalk.bold.red(text));

    if (e instanceof Error) {
      console.log(chalk.italic.gray(e.message));
    }

    process.exit(1);
  }
}

import inquirer from 'inquirer';

import { type IApp } from '../classes/App.js';

export type RestoreMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('RESTORE_TITLE', 'bold');
  this.log.print('RESTORE_TEXT');

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'restore',
      message: this.text('RESTORE_QUESTION'),
      default: false,
    },
  ]);

  if (answers.restore) {
    this.storedParams = this.storeDefaults;

    this.log.success('RESTORE_SUCCESS');
  }
}) as RestoreMethod;

import inquirer from 'inquirer';

import { dir } from '#lib/utils/path';
import { isAdmin } from '#lib/utils/os';
import { print, error } from '#lib/utils/log';

export default async (config, store) => {
    print('RESTORE_TITLE');
    print('RESTORE_TEXT');

    try {
        const answer = await inquirer.prompt({
            name: 'continue',
            type: 'confirm',
            message: 'Выполнить сброс настроек?',
            default: false
        });

        if (answer.continue) {
            store.all = {};

            print('RESTORE_SUCCESS');
        } else {
            process.exit();
        };
    } catch(e) {
        error('RESTORE_ERROR', e);
    };
};
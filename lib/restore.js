import inquirer from 'inquirer';

import { removeFileAsync } from '#lib/utils/fs';
import { print, error } from '#lib/utils/log';

export default async config => {
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
            await removeFileAsync('config/user.json');

            print('RESTORE_SUCCESS');
        } else {
            process.exit();
        };
    } catch(e) {
        error('RESTORE_ERROR', e);
    };
};
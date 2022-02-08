import inquirer from 'inquirer';

import { dir } from '#lib/utils/path';
import { removeFileAsync } from '#lib/utils/fs';
import { isAdmin } from '#lib/utils/os';
import { print, error } from '#lib/utils/log';

export default async config => {
    print('RESTORE_TITLE');
    print('RESTORE_TEXT');

    try {
        if (!await isAdmin()) {
            print('SUDO_ERROR');

            process.exit(1);
        };

        const answer = await inquirer.prompt({
            name: 'continue',
            type: 'confirm',
            message: 'Выполнить сброс настроек?',
            default: false
        });

        if (answer.continue) {
            await removeFileAsync(dir('config/user.json'));

            print('RESTORE_SUCCESS');
        } else {
            process.exit();
        };
    } catch(e) {
        error('RESTORE_ERROR', e);
    };
};
import admin from 'admin-check';

import { checkSudo } from 'check-sudo';

import { error } from '#lib/utils/log';

export const isAdmin = async () => {
    try {
        let check = false;

        if (process.platform === 'win32') {
            check = await admin.check();
        } else {
            check = await checkSudo();
        };

        return check;
    } catch(e) {
        error('CHECK_SUDO_ERROR', e);

        return false;
    };
};
import path from 'path';
import del from 'del';

import { execAsync } from '#lib/utils/shell';
import { spinner } from '#lib/utils/log';

export default async (config, options) => {
    const {
        repo: {
            main: repo
        }
    } = config;

    const {
        repo: {
            name
        }
    } = options;

    const cwd = process.cwd();
    const gitPath = path.join(cwd, `${name}/.git`);
    const loader = spinner();

    loader.start('CLONE_REPO_START');

    const cmd = `git clone ${repo}.git ${name} -b main --single-branch -q`;

    try {
        await execAsync(cmd);
        await del(gitPath);

        loader.success('CLONE_REPO_SUCCESS');
    } catch(e) {
        const { message } = e;

        let code = '';

        if (message.includes('already exists')) {
            code = 'PATH_EXISTS_ERROR';
        } else if (message.includes('command not found')) {
            code = 'GIT_COMMAND_NOT_FOUND_ERROR';
        } else {
            code = 'DEFAULT_ERROR';
        };

        loader.error(code, e);
    };
};
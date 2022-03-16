import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

import cloneRepo from '#lib/tasks/cloneRepo';
import installDeps from '#lib/tasks/installDeps';
import addConfig from '#lib/tasks/addConfig';
import copyBoilerplate from '#lib/tasks/copyBoilerplate';

import { cwd } from '#lib/utils/path';
import { mergeDeep } from '#lib/utils/object';
import { isDirectoryExists } from '#lib/utils/fs';
import { name as projectName, arg } from '#lib/utils/args';
import { validateName } from '#lib/utils/repo';
import { t, print, error } from '#lib/utils/log';

export default async (config, store) => {
    const {
        prompts,
        boilerplate,
        repo
    } = config;

    const stored = store.all;
    const readmeUrl = `${repo.main}#readme`;

    const force = arg('force');
    const data = mergeDeep({}, prompts, stored);

    print('INIT_TITLE');
    print('INIT_TEXT');

    try {
        const options = {};

        const validate = name => {
            if (!validateName(name)) {
                return t('INVALID_PROJECT_NAME_ERROR');
            };

            return true;
        };

        for (let [id, questions] of Object.entries(data)) {
            for (let question of questions) {
                const {
                    name,
                    default: defaultValue
                } = question;

                if (!(id in options)) {
                    options[id] = {};
                };

                if ((id === 'repo') && (name === 'name') && projectName) {
                    options[id].name = projectName;

                    continue;
                };

                if (force && !((
                        (id === 'repo') && (name === 'name') && !projectName
                    ) || (
                        (id === 'info') && ((name === 'title') || (name === 'description'))
                    ))) {
                    options[id][name] = defaultValue;

                    continue;
                };

                const prompt = (id === 'repo' && name === 'name') ? {
                    ...question,
                    validate
                } : question;

                const answer = await inquirer.prompt(prompt);
                const value = answer[name];

                if (id === 'repo' && name === 'name') {
                    if (value && await isDirectoryExists(cwd(value))) {
                        print('PATH_EXISTS_ERROR');

                        process.exit(1);
                    };
                };

                if (name === 'continue' && !value) {
                    questions.filter(({ name }) => name !== 'continue').forEach(prompt => {
                        const {
                            name,
                            default: defaultValue
                        } = prompt;

                        let value = false;

                        if (typeof defaultValue === 'string') {
                            value = '';
                        } else if (Array.isArray(defaultValue)) {
                            value = [];
                        } else {
                            value = {};
                        };

                        options[id][name] = value;
                    });

                    break;
                } else {
                    options[id][name] = value;
                };
            };
        };

        await cloneRepo(config, options);
        await installDeps(config, options);
        await addConfig(config, options);
        await copyBoilerplate(config, options);

        print('INIT_SUCCESS');
        print('INIT_MANUAL');

        console.log(`${chalk.italic(readmeUrl)}`);
    } catch (e) {
        const code = e.isTtyError ? 'ENVIRONMENT_ERROR' : 'DEFAULT_ERROR';

        error(code, e);
    };
};

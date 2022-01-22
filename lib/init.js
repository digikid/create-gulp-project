import chalk from 'chalk';
import inquirer from 'inquirer';

import cloneRepo from '#lib/tasks/cloneRepo';
import installDeps from '#lib/tasks/installDeps';
import addConfig from '#lib/tasks/addConfig';
import copyBoilerplate from '#lib/tasks/copyBoilerplate';

import { isExistsAsync } from '#lib/utils/fs';
import { keys, arg } from '#lib/utils/args';
import { print, error } from '#lib/utils/log';

const checkDirectoryExists = async path => {
    if (path && await isExistsAsync(`../${path}`)) {
        print('PATH_EXISTS_ERROR');

        process.exit(1);
    };
};

export default async config => {
    const {
        prompts,
        user,
        boilerplate,
        repo
    } = config;

    const readmeUrl = `${repo.main}#readme`;
    const argName = keys.length ? keys[0] : '';

    await checkDirectoryExists(argName);

    print('INIT_TITLE');
    print('INIT_TEXT');

    try {
        const options = {};
        const force = arg('force');

        const validate = async input => {
            const regex = /[<>:"\/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;

            if (!input.trim().length || regex.test(input)) {
                return 'Задайте корректное имя';
            };

            return true;
        };

        for (let [id, questions] of Object.entries(user || prompts)) {
            for (let question of questions) {
                const {
                    name,
                    default: defaultValue
                } = question;

                if (!(id in options)) {
                    options[id] = {};
                };

                if ((id === 'repo') && (name === 'name') && argName) {
                    options[id].name = argName;

                    continue;
                };

                if (force && !((
                        (id === 'repo') && (name === 'name') && !argName
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
                    await checkDirectoryExists(value);
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

import inquirer from 'inquirer';

import { writeFileAsync } from '#lib/utils/fs';
import { dir } from '#lib/utils/path';
import { print, error } from '#lib/utils/log';

export default async config => {
    const { prompts } = config;

    print('CONFIGURATE_TITLE');
    print('CONFIGURATE_TEXT');

    try {
        const options = JSON.parse(JSON.stringify(prompts));

        for (let [id, questions] of Object.entries(prompts)) {
            if (id === 'repo') {
                questions.shift();
            };

            for (let question of questions) {
                const { name } = question;

                if (
                    ((id === 'repo') && (name === 'name')) ||
                    ((id === 'info') && ((name === 'title') || (name === 'description')))
                ) {
                    continue;
                };

                const answer = await inquirer.prompt(question);
                const value = answer[name];
                const prompt = options[id].find(prompt => prompt.name === name);

                if (prompt && ('default' in prompt)) {
                    prompt.default = value;
                };

                if (name === 'continue' && !value) {
                    options[id].filter(({ name }) => name !== 'continue').forEach(prompt => {
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

                        prompt.default = value;
                    });

                    break;
                };
            };
        };

        await writeFileAsync('config/user.json', JSON.stringify(options, null, 2));

        print('CONFIGURATE_SUCCESS');
    } catch(e) {
        const code = e.isTtyError ? 'ENVIRONMENT_ERROR' : 'CONFIGURATE_ERROR';

        error(code, e);
    };
};
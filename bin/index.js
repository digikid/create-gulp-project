#!/usr/bin/env node

import chalk from 'chalk';
import configStore from 'configstore';

import init from '#lib/init';
import configurate from '#lib/configurate';
import restore from '#lib/restore';

import { cwd, dir } from '#lib/utils/path';
import { scanDirectory, readFileAsync, isDirectoryExists } from '#lib/utils/fs';
import { validateName, parsePackageJson, parseRepoUrl, isNewestVersion } from '#lib/utils/repo';
import { isValid } from '#lib/utils/json';
import { name, arg } from '#lib/utils/args';
import { print, error } from '#lib/utils/log';

(async () => {
    const config = {};

    const pjson = await parsePackageJson();

    const { repository: { url } } = pjson;
    const { owner: repoOwner, name: repoName } = parseRepoUrl(url);

    const cmd = `npm i -g ${repoOwner}/${repoName}`;

    const store = new configStore(repoName);

    if (!await isNewestVersion()) {
        print('OUTDATED_VERSION_ERROR');
        print('OUTDATED_VERSION_TEXT');

        console.log(`${chalk.italic(cmd)}`);

        process.exit(1);
    };

    if (name) {
        if (!validateName(name)) {
            print('INVALID_PROJECT_NAME_ERROR');

            process.exit(1);
        };

        if (await isDirectoryExists(cwd(name))) {
            print('PATH_EXISTS_ERROR');

            process.exit(1);
        };
    };

    const files = scanDirectory(dir('config'), {
        extensions: ['json']
    });

    try {
        for (const file of files) {
            const { name } = file;

            const key = name.replace('.json', '');

            const data = await readFileAsync(dir(`config/${name}`));
            const value = isValid(data) ? JSON.parse(data) : {};

            config[key] = value;
        };

        if (arg('config')) {
            await configurate(config, store);
        } else if (arg('restore')) {
            await restore(config, store);
        } else {
            await init(config, store);
        };
    } catch(e) {
        error('DEFAULT_ERROR', e);
    };
})();
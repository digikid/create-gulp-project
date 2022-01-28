#!/usr/bin/env node

import init from '#lib/init';
import configurate from '#lib/configurate';
import restore from '#lib/restore';

import { dir } from '#lib/utils/path';
import { scanDirectory, readFileAsync } from '#lib/utils/fs';
import { isValid } from '#lib/utils/json';
import { arg } from '#lib/utils/args';
import { error } from '#lib/utils/log';

(async () => {
    const config = {};

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
            await configurate(config);
        } else if (arg('restore')) {
            await restore(config);
        } else {
            await init(config);
        };
    } catch(e) {
        error('DEFAULT_ERROR', e);
    };
})();
import path from 'path';
import del from 'del';
import beautify from 'js-beautify';

import {
    mergeDirsAsync,
    replaceAsync,
    scanDirectory,
    readFileAsync,
    writeFileAsync
} from '#lib/utils/fs';

import { findDeep } from '#lib/utils/object';
import { spinner } from '#lib/utils/log';

export default async (config, options) => {
    const { boilerplate } = config;

    const {
        files,
        vendor
    } = options;

    if (!files.boilerplate) return;

    const loader = spinner();
    const cwd = process.cwd();

    const source = path.join(cwd, 'gulp/boilerplate');
    const dest = path.join(cwd, 'src');

    const paths = {
        styles: path.join(cwd, 'src/styles'),
        js: path.join(cwd, 'src/js')
    };

    const replaces = {
        from: [],
        to: []
    };

    const removedFiles = [];

    const dependencies = (vendor && ('dependencies' in vendor)) ? vendor.dependencies : [];

    const addReplace = (reg, replace) => {
        replaces.from.push(reg);
        replaces.to.push(replace);
    };

    Object.keys(boilerplate).forEach(key => {
        const {
            files,
            exclude
        } = boilerplate[key];

        const removed = files.map(path => `src/${path}`);
        const excluded = exclude.map(path => `src/${path}`);

        const regs = [
            `(/* if:${key} *?/)`,
            '(.*?)',
            `(/* /if:${key} */)`
        ];

        const regString = regs.reduce((acc, reg) => {
            acc += (reg.includes('if') ? reg.replace(/[-[\]{}*+.,\\^$|#]/g, '\\$&') : reg);

            return acc;
        }, '');

        const regStringNegative = regString.replace(/if:/g, 'if:\\!');

        [regString, regStringNegative].forEach(str => {
            const regex = new RegExp(str, 'gis');

            replaces.from.push(regex);
        });

        if (dependencies.includes('*') || dependencies.includes(key)) {
            replaces.to.push('$2');
            replaces.to.push('');

            removedFiles.push(...excluded);
        } else {
            replaces.to.push('');
            replaces.to.push('$2');

            removedFiles.push(...removed);
        };
    });

    const n = (process.platform === 'win32') ? '\r\n' : '\n';

    try {
        loader.start('COPY_BOILERPLATE_START');

        const formattedFiles = [];

        await mergeDirsAsync(source, dest);

        for (const path of Object.values(paths)) {
            const tree = scanDirectory(path);
            const files = findDeep(tree, ({ type }) => (type === 'file'));

            for (const file of files) {
                const data = await readFileAsync(file.path);

                if (data && data.includes('/* if')) {
                    formattedFiles.push(file.path);
                };
            };
        };

        await replaceAsync({
            files: [
                `${paths.styles}/**`,
                `${paths.js}/**`
            ],
            ...replaces
        });

        for (const file of removedFiles) {
            await del(path.join(cwd, file));
        };

        for (const file of formattedFiles) {
            const type = file.includes('.js') ? 'js' : 'css';

            const data = await readFileAsync(file);

            let formatted = beautify[type](data, {
                indent_size: 4,
                max_preserve_newlines: 2,
                preserve_newlines: true,
                brace_style: 'collapse,preserve-inline'
            });

            if (type === 'js') {
                formatted = formatted.replace(/(,)(\n+)/gim, `$1${n}`).replace(/(\n+)(@?import)/gim, `${n}$2`);
            };

            await writeFileAsync(file, formatted);
        };

        loader.success('COPY_BOILERPLATE_SUCCESS');
    } catch(e) {
        loader.error('COPY_BOILERPLATE_ERROR', e);
    };
};
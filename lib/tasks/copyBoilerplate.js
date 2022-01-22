import path from 'path';
import del from 'del';

import { mergeDirsAsync, replaceAsync } from '#lib/utils/fs';

import { spinner } from '#lib/utils/log';

export default async (config, options) => {
    const { boilerplate } = config;

    const {
        files,
        vendor
    } = options;

    if (!files.boilerplate) {
        return;
    };

    const loader = spinner();
    const cwd = process.cwd();

    const source = path.join(cwd, 'gulp/boilerplate');
    const dest = path.join(cwd, 'src');

    const paths = {
        styles: path.join(cwd, 'src/styles/**'),
        js: path.join(cwd, 'src/js/**')
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

    addReplace(/(\r\n|\r|\n){1,}/g, '$1\n');
    addReplace(/^\s+\n/gm, '');
    addReplace(/(\{|,|\/\/.*)(\n+)/g, '$1\n');
    addReplace(/(\n+)(}|@?import)/g, '\n$2');
    addReplace(/;(\n+)(\s+)\$/g, ';\n\n$2\$');
    addReplace(/(\n+)(\s+)}/g, '\n$2}');

    try {
        loader.start('COPY_BOILERPLATE_START');

        await mergeDirsAsync(source, dest);

        await replaceAsync({
            files: [
                paths.styles,
                paths.js
            ],
            ...replaces
        });

        if (removedFiles.length) {
            for (const file of removedFiles) {
                await del(path.join(cwd, file));
            };
        };

        loader.success('COPY_BOILERPLATE_SUCCESS');
    } catch(e) {
        loader.error('COPY_BOILERPLATE_ERROR', e);
    };
};
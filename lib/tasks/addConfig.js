import { parseRepoUrl } from '#lib/utils/path';
import { replaceAsync } from '#lib/utils/fs';
import { spinner } from '#lib/utils/log';

export default async (config, options) => {
    const loader = spinner();

    const {
        repo: {
            main: originalRepoUrl,
            title: originalRepoTitle
        }
    } = config;

    const {
        repo,
        info,
        contacts,
        params
    } = options;

    const data = {};
    const repoUrl = `https://${repo.host.toLowerCase()}.com/${repo.owner}/${repo.name}`;

    const originalRepo = parseRepoUrl(originalRepoUrl);

    let description = '';

    if (info) {
        const {
            title,
            copyright
        } = info;

        if (title) {
            data.title = title;
        };

        if (copyright) {
            data.copyright = copyright;
        };

        if (info.description) {
            description = info.description;
        };
    };

    if (contacts) {
        const {
            name,
            job,
            telegram
        } = contacts;

        data.authors = [{
            name,
            job,
            contacts: [{
                title: `@${telegram}`,
                href: `https://t.me/${telegram}`
            }]
        }];
    };

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                if (!('presets' in data)) {
                    data.presets = {
                        global: {}
                    };
                };

                data.presets.global[key] = value;

                if ((key === 'babel')) {
                    if (!('modules' in data.presets.global)) {
                        data.presets.global.modules = {};
                    };

                    data.presets.global.modules[key] = value;
                };
            };
        });
    };

    loader.start('ADD_CONFIG_START');

    try {
        const configData = JSON.stringify(data, null, 4).replace(/"([^"]+)":/gis, '$1:').replace(/"/g, '\'');

        await replaceAsync({
            files: './config.js',
            from: /\{\}/,
            to: configData
        });

        await replaceAsync({
            files: './README.md',
            from: [
                originalRepoTitle,
                /(\n+)(\!\[GitHub release])(.*)(\.svg\))(\n+)/gis
            ],
            to: [
                info.title,
                '\n\n'
            ]
        });

        await replaceAsync({
            files: [
                './package.json',
                './package-lock.json'
            ],
            from: /"name": ".*"/,
            to: `"name": "${repo.name}"`
        });

        await replaceAsync({
            files: './package.json',
            from: [
                /"description": ".*"/,
                /"author": ".*"/,
                new RegExp(originalRepoUrl, 'gis')
            ],
            to: [
                `"description": "${description}"`,
                `"author": "${repo.author}"`,
                repoUrl
            ]
        });

        loader.success('ADD_CONFIG_SUCCESS');
    } catch(e) {
        loader.error('ADD_CONFIG_ERROR', e);
    };
};
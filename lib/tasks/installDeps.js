import { cd, execAsync } from '#lib/utils/shell';
import { spinner } from '#lib/utils/log';

export default async (config, options) => {
    const { boilerplate } = config;

    const {
        repo: {
            name
        },
        vendor
    } = options;

    const loader = spinner();

    let cmd = 'npm i';

    if (vendor) {
        const { dependencies } = vendor;

        const deps = Object.keys(boilerplate).reduce((acc, key) => {
            const { install } = boilerplate[key];

            if (dependencies.includes('*') || dependencies.includes(key)) {
                if (Array.isArray(install)) {
                    install.forEach(dep => acc.push(dep));
                } else {
                    acc.push(install);
                };
            };

            return acc;
        }, []);

        if (deps.length) {
            cmd += ` ${deps.join(' ')}`;
        };
    };

    try {
        loader.start('INSTALL_DEPS_START');

        cd(name);

        await execAsync(cmd);

        loader.success('INSTALL_DEPS_SUCCESS');
    } catch(e) {
        loader.error('INSTALL_DEPS_ERROR', e);
    };
};
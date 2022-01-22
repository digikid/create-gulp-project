import shell from 'shelljs';

export const cd = shell.cd;

export const execAsync = (cmd, opts = {}) => {
    return new Promise((resolve, reject) => {
        shell.exec(cmd, {
            silent: true,
            ...opts
        }, (code, stdout, stderr) => {
            if (code) {
                return reject(new Error(stderr));
            };

            return resolve(stdout);
        });
    });
};
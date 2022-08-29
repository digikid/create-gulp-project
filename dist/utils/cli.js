import shell from 'shelljs';
export const { cd } = shell;
export const execAsync = (cmd, options = {}) => new Promise((resolve, reject) => {
    shell.exec(cmd, Object.assign({ silent: true }, options), (code, stdout, stderr) => {
        if (code) {
            return reject(new Error(stderr));
        }
        return resolve(stdout);
    });
});

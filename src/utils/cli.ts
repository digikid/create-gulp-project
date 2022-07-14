import shell from 'shelljs';

export const { cd } = shell;

export const execAsync = (cmd: string, options = {}): Promise<string | Error> => new Promise((resolve, reject) => {
  shell.exec(cmd, {
    silent: true,
    ...options,
  }, (code, stdout, stderr) => {
    if (code) {
      return reject(new Error(stderr));
    }

    return resolve(stdout);
  });
});

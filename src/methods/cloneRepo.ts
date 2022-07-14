import path from 'path';
import del from 'del';

import { execAsync } from '../utils/cli.js';
import { type Entries } from '../utils/object.js';
import { type IApp } from '../classes/App.js';

import Spinner from '../classes/Spinner.js';

export type CloneRepoMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const { name } = this.params.common;

  const cmd = `git clone ${this.repo.url}.git ${name} -b main --single-branch -q`;

  const removedFiles = [
    '.git',
    'README.md',
    'README-ru.md',
    'CHANGELOG.md',
    'LICENSE',
    'logo.png',
  ].map((file) => path.join(process.cwd(), `${name}/${file}`));

  const spinner = new Spinner(this.text('CLONE_REPO_START'));

  try {
    await execAsync(cmd);
    await del(removedFiles);

    spinner.success(this.text('CLONE_REPO_SUCCESS'));
  } catch (e) {
    const errorCodes = {
      'already exists': 'PATH_EXISTS_ERROR',
      'command not found': 'GIT_COMMAND_ERROR',
    };

    let code = 'CLONE_REPO_ERROR';

    (Object.entries(errorCodes) as Entries<typeof errorCodes>).forEach(([key, value]) => {
      if (e instanceof Error && e.message.includes(key)) {
        code = value;
      }
    });

    spinner.error(this.text(code), (code === 'CLONE_REPO_ERROR') ? e : undefined);
  }
}) as CloneRepoMethod;

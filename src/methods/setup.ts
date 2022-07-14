import path from 'path';
import shell from 'shelljs';

import isValidFilename from 'valid-filename';

import { args } from '../utils/args.js';
import { isExists } from '../utils/fs.js';
import { getVersion, isVersionOutdated } from '../utils/repo.js';
import { type IApp } from '../classes/App.js';

export type SetupMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const name = args.find((arg) => !arg.startsWith('-'));

  const [current, latest] = await getVersion(this.packageJson);

  if (latest && isVersionOutdated(current, latest)) {
    this.log.error('VERSION_VALIDATE_ERROR');

    await this.version();

    process.exit(1);
  }

  if (name) {
    if (isExists(path.join(this.rootPath, name))) {
      this.log.error('PATH_EXISTS_ERROR');

      process.exit(1);
    }

    if (isValidFilename(name)) {
      this.params.common.name = name;
    } else {
      this.log.error('FOLDER_NAME_ERROR');

      process.exit(1);
    }
  }

  this.log.print('SETUP_TITLE', 'bold');
  this.log.print('SETUP_TEXT');

  try {
    await this.prompt();
    await this.cloneRepo();
    await this.npmInstall();
    await this.updateConfig();

    if (this.params.boilerplate) {
      await this.copyBoilerplate();
    }

    this.log.success('SETUP_SUCCESS');
  } catch (e) {
    this.log.error('SETUP_UNKNOWN_ERROR', e);
  }
}) as SetupMethod;

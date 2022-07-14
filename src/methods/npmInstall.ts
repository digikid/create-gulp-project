import { cd, execAsync } from '../utils/cli.js';
import { type Entries } from '../utils/object.js';
import { type StoreBoilerplate } from '../classes/Store.js';
import { type IApp } from '../classes/App.js';

import Spinner from '../classes/Spinner.js';

export type NpmInstallMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const spinner = new Spinner(this.text('NPM_INSTALL_START'));

  const dependencies = (Object.entries(this.boilerplate) as Entries<StoreBoilerplate>).reduce((acc, [key, value]) => {
    const { install } = value;

    if (this.params.dependencies.includes(key)) {
      if (Array.isArray(install)) {
        install.forEach((dep) => acc.push(dep));
      } else {
        acc.push(install);
      }
    }
    return acc;
  }, [] as string[]);

  const cmd = dependencies.reduce((acc, dep) => `${acc} ${dep}`, 'npm i');

  try {
    cd(this.params.common.name);

    await execAsync(cmd);

    spinner.success(this.text('NPM_INSTALL_SUCCESS'));
  } catch (e) {
    spinner.error(this.text('NPM_INSTALL_ERROR'), e);
  }
}) as NpmInstallMethod;

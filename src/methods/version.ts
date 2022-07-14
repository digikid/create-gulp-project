import { parseRepoUrl, getVersion, isVersionOutdated } from '../utils/repo.js';

import { type IApp } from '../classes/App.js';

export type VersionMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const [current, latest] = await getVersion(this.packageJson);

  const { owner, name } = parseRepoUrl(this.packageJson);

  if (current) {
    this.log.print('VERSION_TITLE', 'bold');
    this.log.print(current);

    if (latest) {
      if (isVersionOutdated(current, latest)) {
        this.log.print('VERSION_LATEST_TITLE', 'bold', 'green');
        this.log.print(latest, 'bold', 'green');
        this.log.print('VERSION_TEXT', 'bold');
        this.log.print(`npm i -g ${owner}/${name}`, 'italic', 'gray');
      }
    } else {
      this.log.warning('VERSION_LATEST_ERROR');
    }
  }
}) as VersionMethod;

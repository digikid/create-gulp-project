import path from 'path';

import { readFile, replaceAsync, writeFileAsync } from '../utils/fs.js';
import { parseRepoUrl } from '../utils/repo.js';
import { replaceAll } from '../utils/string.js';
import { type IApp } from '../classes/App.js';

import Spinner from '../classes/Spinner.js';

export type UpdateConfigMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const spinner = new Spinner(this.text('UPDATE_CONFIG_START'));

  const { name, title, description } = this.params.common;
  const { host, owner } = this.params.repo;
  const { copyright } = this.params.info;
  const {
    name: authorName, job, telegram, email, website,
  } = this.params.contacts;

  const fields = {
    description,
    copyright,
  };

  const config = Object.entries(fields).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {
    title,
  } as Record<string, any>);

  if ([authorName, job, telegram, email, website].some((value) => !!value)) {
    const author: any = {};

    if (authorName) {
      author.name = authorName;
    }

    if (job) {
      author.job = job;
    }

    if (telegram || email || website) {
      author.contacts = [];

      if (telegram) {
        author.contacts.push({
          title: `@${telegram}`,
          href: `https://t.me/${telegram}`,
        });
      }

      if (email) {
        author.contacts.push({
          title: email,
          href: `mailto:${email}`,
        });
      }

      if (website) {
        author.contacts.push({
          title: website,
          href: `https://${website}/`,
        });
      }

      config.authors = [author];
    }
  }

  try {
    const repoUrl = `https://${host}.com/${owner}/${name}`;
    const author = `${authorName} <${email}> (${website ? `https://${website}/` : ''})`.replace(/<>|\(\)/gi, '').trim();

    for (const file of ['package.json', 'package-lock.json']) {
      const filePath = path.join(process.cwd(), file);
      const data = JSON.parse(readFile(filePath));

      data.name = name;
      data.version = '1.0.0';

      if (file === 'package.json') {
        data.description = description;
        data.repository.url = `${repoUrl}.git`;
        data.bugs.url = `${repoUrl}/issues`;
        data.author = author;
        data.configuratorVersion = this.packageJson.version;
      }

      await writeFileAsync(filePath, JSON.stringify(data, null, 2));
    }

    const configPath = path.join(process.cwd(), 'config.js');
    const configData = replaceAll(JSON.stringify(config, null, 4), [
      [/"([^"]+)":/gis, '$1:'],
      [/"/g, '\''],
    ]);

    await replaceAsync(configPath, [/\{\}/, configData]);

    const readmePath = path.join(process.cwd(), 'README.md');
    const readmeUrl = this.repo.url;
    const readmeCopyright = this.text('README_COPYRIGHT').replace('URL', readmeUrl).replace('NAME', parseRepoUrl(readmeUrl).name);
    const readmeData = `# ${title}${description ? `\n\n${description}` : ''}\n\n${readmeCopyright}.`;

    await writeFileAsync(readmePath, readmeData);

    spinner.success(this.text('UPDATE_CONFIG_SUCCESS'));
  } catch (e) {
    spinner.error(this.text('UPDATE_CONFIG_SUCCESS'), e);
  }
}) as UpdateConfigMethod;

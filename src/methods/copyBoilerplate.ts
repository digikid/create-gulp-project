import path from 'path';
import del from 'del';
import beautify from 'js-beautify';

import {
  mergeDirsAsync, readFileAsync, scanFiles, writeFileAsync,
} from '../utils/fs.js';
import { type StoreBoilerplate } from '../classes/Store.js';
import { replaceAll, type StringReplaces } from '../utils/string.js';
import { type Entries } from '../utils/object.js';
import { type IApp } from '../classes/App.js';

import Spinner from '../classes/Spinner.js';

export type CopyBoilerplateMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const spinner = new Spinner(this.text('COPY_BOILERPLATE_START'));

  const n = (process.platform === 'win32') ? '\r\n' : '\n';

  const sourcePath = path.join(process.cwd(), 'gulp/boilerplate');
  const destPath = path.join(process.cwd(), 'src');

  const paths = ['styles', 'js'].reduce((acc, folder) => {
    acc[folder] = path.join(process.cwd(), `src/${folder}`);

    return acc;
  }, {} as Record<string, string>);

  const replaces: StringReplaces[] = [];

  try {
    await mergeDirsAsync(sourcePath, destPath);

    for (const [key, value] of (Object.entries(this.boilerplate) as Entries<StoreBoilerplate>)) {
      const { files, exclude } = value;

      const isChecked = this.params.dependencies.includes(key);

      const removedFiles = (isChecked ? exclude : files).map((file) => path.join(process.cwd(), `src/${file}`));

      const regs = [
        `(/* if:${key} *?/)`,
        '(.*?)',
        `(/* /if:${key} */)`,
      ];

      const regString = regs.reduce((acc, reg) => {
        acc += (reg.includes('if') ? reg.replace(/[-[\]{}*+.,\\^$|#]/g, '\\$&') : reg);

        return acc;
      }, '');

      const regStringNegative = regString.replace(/if:/g, 'if:\\!');

      [regString, regStringNegative].forEach((str, i) => {
        const reg = new RegExp(str, 'gism');
        const reps = ['$2', ''];

        if (i === 0) {
          replaces.push([reg, isChecked ? reps[0] : reps[1]]);
        }

        if (i === 1) {
          replaces.push([reg, isChecked ? reps[1] : reps[0]]);
        }
      });

      for (const file of removedFiles) {
        await del(file);
      }
    }

    for (const path of Object.values(paths)) {
      const files = scanFiles(path);

      for (const file of files) {
        const type = file.extension === 'js' ? 'js' : 'css';
        const data = await readFileAsync(file.path);

        if (data.includes('/* if')) {
          const replaced = replaceAll(data, replaces);

          let formatted = beautify[type](replaced, {
            indent_size: 4,
            max_preserve_newlines: 2,
            preserve_newlines: true,
            // @ts-ignore
            brace_style: 'collapse,preserve-inline',
          });

          if (type === 'js') {
            formatted = formatted.replace(/(,)(\n+)/gim, `$1${n}`).replace(/(\n+)(@?import)/gim, `${n}$2`);
          }

          await writeFileAsync(file.path, formatted);
        }
      }
    }

    spinner.success(this.text('COPY_BOILERPLATE_SUCCESS'));
  } catch (e) {
    spinner.error(this.text('COPY_BOILERPLATE_SUCCESS'), e);
  }
}) as CopyBoilerplateMethod;

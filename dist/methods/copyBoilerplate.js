var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import del from 'del';
import beautify from 'js-beautify';
import { mergeDirsAsync, readFileAsync, scanFiles, writeFileAsync, } from '../utils/fs.js';
import { replaceAll } from '../utils/string.js';
import Spinner from '../classes/Spinner.js';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = new Spinner(this.text('COPY_BOILERPLATE_START'));
        const n = (process.platform === 'win32') ? '\r\n' : '\n';
        const sourcePath = path.join(process.cwd(), 'gulp/boilerplate');
        const destPath = path.join(process.cwd(), 'src');
        const paths = ['styles', 'js'].reduce((acc, folder) => {
            acc[folder] = path.join(process.cwd(), `src/${folder}`);
            return acc;
        }, {});
        const replaces = [];
        try {
            yield mergeDirsAsync(sourcePath, destPath);
            for (const [key, value] of Object.entries(this.boilerplate)) {
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
                    yield del(file);
                }
            }
            for (const path of Object.values(paths)) {
                const files = scanFiles(path);
                for (const file of files) {
                    const type = file.extension === 'js' ? 'js' : 'css';
                    const data = yield readFileAsync(file.path);
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
                        yield writeFileAsync(file.path, formatted);
                    }
                }
            }
            spinner.success(this.text('COPY_BOILERPLATE_SUCCESS'));
        }
        catch (e) {
            spinner.error(this.text('COPY_BOILERPLATE_SUCCESS'), e);
        }
    });
});

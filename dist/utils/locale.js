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
import { osLocale } from 'os-locale';
import { __dirname } from './path.js';
import { readFile, scanFiles } from './fs.js';
export const defaultLocale = 'en-US';
export const getLocale = () => __awaiter(void 0, void 0, void 0, function* () {
    const locale = yield osLocale();
    const rootPath = path.join(__dirname, 'src/locale');
    const locales = scanFiles(rootPath, {
        extensions: ['json'],
    }).reduce((acc, file) => {
        const name = file.name.replace('.json', '');
        acc[name] = JSON.parse(readFile(path.join(rootPath, file.relativePath)));
        return acc;
    }, {});
    return locales[locale in locales ? locale : defaultLocale];
});

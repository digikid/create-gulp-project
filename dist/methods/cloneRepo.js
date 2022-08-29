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
import { execAsync } from '../utils/cli.js';
import Spinner from '../classes/Spinner.js';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = this.params.common;
        const cmd = `git clone ${this.repo.url}.git ${name} -b main --single-branch -q`;
        const removedFiles = [
            '.git',
            'README.md',
            'README.ru-RU.md',
            'CHANGELOG.md',
            'LICENSE',
            'logo.png',
        ].map((file) => path.join(process.cwd(), `${name}/${file}`));
        const spinner = new Spinner(this.text('CLONE_REPO_START'));
        try {
            yield execAsync(cmd);
            yield del(removedFiles);
            spinner.success(this.text('CLONE_REPO_SUCCESS'));
        }
        catch (e) {
            const errorCodes = {
                'already exists': 'PATH_EXISTS_ERROR',
                'command not found': 'GIT_COMMAND_ERROR',
            };
            let code = 'CLONE_REPO_ERROR';
            Object.entries(errorCodes).forEach(([key, value]) => {
                if (e instanceof Error && e.message.includes(key)) {
                    code = value;
                }
            });
            spinner.error(this.text(code), (code === 'CLONE_REPO_ERROR') ? e : undefined);
        }
    });
});

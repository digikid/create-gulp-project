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
import isValidFilename from 'valid-filename';
import { args } from '../utils/args.js';
import { isExists } from '../utils/fs.js';
import { getVersion, isVersionOutdated } from '../utils/repo.js';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const name = args.find((arg) => !arg.startsWith('-'));
        const [current, latest] = yield getVersion(this.packageJson);
        if (latest && isVersionOutdated(current, latest)) {
            this.log.error('VERSION_VALIDATE_ERROR');
            yield this.version();
            process.exit(1);
        }
        if (name) {
            if (isExists(path.join(this.rootPath, name))) {
                this.log.error('PATH_EXISTS_ERROR');
                process.exit(1);
            }
            if (isValidFilename(name)) {
                this.params.common.name = name;
            }
            else {
                this.log.error('FOLDER_NAME_ERROR');
                process.exit(1);
            }
        }
        this.log.print('SETUP_TITLE', 'bold');
        this.log.print('SETUP_TEXT');
        try {
            yield this.prompt();
            yield this.cloneRepo();
            yield this.npmInstall();
            yield this.updateConfig();
            if (this.params.boilerplate) {
                yield this.copyBoilerplate();
            }
            this.log.success('SETUP_SUCCESS');
        }
        catch (e) {
            this.log.error('SETUP_UNKNOWN_ERROR', e);
        }
    });
});

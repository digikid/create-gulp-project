var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseRepoUrl, getVersion, isVersionOutdated } from '../utils/repo.js';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        const [current, latest] = yield getVersion(this.packageJson);
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
            }
            else {
                this.log.warning('VERSION_LATEST_ERROR');
            }
        }
    });
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toDefaults } from '../utils/store.js';
export default (function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.log.print('CONFIG_TITLE', 'bold');
        this.log.print('CONFIG_TEXT');
        try {
            yield this.prompt(true);
            this.storedParams = toDefaults(this.params);
            this.log.success('CONFIG_SUCCESS');
        }
        catch (e) {
            this.log.error('CONFIG_ERROR', e);
        }
    });
});

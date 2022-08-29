import { type CloneRepoMethod } from '../methods/cloneRepo.js';
import { type ConfigMethod } from '../methods/config.js';
import { type CopyBoilerplateMethod } from '../methods/copyBoilerplate.js';
import { type HelpMethod } from '../methods/help.js';
import { type InitMethod } from '../methods/init.js';
import { type NpmInstallMethod } from '../methods/npmInstall.js';
import { type PromptMethod } from '../methods/prompt.js';
import { type RestoreMethod } from '../methods/restore.js';
import { type SetupMethod } from '../methods/setup.js';
import { type TextMethod } from '../methods/text.js';
import { type UpdateConfigMethod } from '../methods/updateConfig.js';
import { type VersionMethod } from '../methods/version.js';
import { type Locale } from '../utils/locale.js';
import Store, { type IStore } from './Store.js';
import { type ILogger } from './Logger.js';
export interface IApp extends IStore {
    readonly locale: Locale;
    readonly log: ILogger;
    readonly rootPath: string;
    readonly cloneRepo: CloneRepoMethod;
    readonly config: ConfigMethod;
    readonly copyBoilerplate: CopyBoilerplateMethod;
    readonly help: HelpMethod;
    readonly init: InitMethod;
    readonly npmInstall: NpmInstallMethod;
    readonly prompt: PromptMethod;
    readonly restore: RestoreMethod;
    readonly setup: SetupMethod;
    readonly text: TextMethod;
    readonly updateConfig: UpdateConfigMethod;
    readonly version: VersionMethod;
}
export default class App extends Store implements IApp {
    locale: Locale;
    constructor(locale: Locale);
    log: ILogger;
    rootPath: string;
    cloneRepo: CloneRepoMethod;
    config: ConfigMethod;
    copyBoilerplate: CopyBoilerplateMethod;
    help: HelpMethod;
    init: InitMethod;
    npmInstall: NpmInstallMethod;
    prompt: PromptMethod;
    restore: RestoreMethod;
    setup: SetupMethod;
    text: TextMethod;
    updateConfig: UpdateConfigMethod;
    version: VersionMethod;
}
//# sourceMappingURL=App.d.ts.map
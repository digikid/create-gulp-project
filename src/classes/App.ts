import cloneRepo, { type CloneRepoMethod } from '../methods/cloneRepo.js';
import config, { type ConfigMethod } from '../methods/config.js';
import copyBoilerplate, { type CopyBoilerplateMethod } from '../methods/copyBoilerplate.js';
import help, { type HelpMethod } from '../methods/help.js';
import init, { type InitMethod } from '../methods/init.js';
import npmInstall, { type NpmInstallMethod } from '../methods/npmInstall.js';
import prompt, { type PromptMethod } from '../methods/prompt.js';
import restore, { type RestoreMethod } from '../methods/restore.js';
import setup, { type SetupMethod } from '../methods/setup.js';
import text, { type TextMethod } from '../methods/text.js';
import updateConfig, { type UpdateConfigMethod } from '../methods/updateConfig.js';
import version, { type VersionMethod } from '../methods/version.js';

import { type Locale } from '../utils/locale.js';

import Store, { type IStore } from './Store.js';
import Logger, { type ILogger } from './Logger.js';

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
  constructor(public locale: Locale) {
    super();

    this.log = new Logger(locale);
  }

  public log: ILogger;

  public rootPath = process.cwd();

  public cloneRepo = cloneRepo;

  public config = config;

  public copyBoilerplate = copyBoilerplate;

  public help = help;

  public init = init;

  public npmInstall = npmInstall;

  public prompt = prompt;

  public restore = restore;

  public setup = setup;

  public text = text;

  public updateConfig = updateConfig;

  public version = version;
}

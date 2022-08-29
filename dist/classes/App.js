import cloneRepo from '../methods/cloneRepo.js';
import config from '../methods/config.js';
import copyBoilerplate from '../methods/copyBoilerplate.js';
import help from '../methods/help.js';
import init from '../methods/init.js';
import npmInstall from '../methods/npmInstall.js';
import prompt from '../methods/prompt.js';
import restore from '../methods/restore.js';
import setup from '../methods/setup.js';
import text from '../methods/text.js';
import updateConfig from '../methods/updateConfig.js';
import version from '../methods/version.js';
import Store from './Store.js';
import Logger from './Logger.js';
export default class App extends Store {
    constructor(locale) {
        super();
        this.locale = locale;
        this.rootPath = process.cwd();
        this.cloneRepo = cloneRepo;
        this.config = config;
        this.copyBoilerplate = copyBoilerplate;
        this.help = help;
        this.init = init;
        this.npmInstall = npmInstall;
        this.prompt = prompt;
        this.restore = restore;
        this.setup = setup;
        this.text = text;
        this.updateConfig = updateConfig;
        this.version = version;
        this.log = new Logger(locale);
    }
}
